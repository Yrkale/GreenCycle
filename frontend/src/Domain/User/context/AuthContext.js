// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AuthService from "../services/AuthService"; // ⚠️ check spelling: "services"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  // Load user profile if token exists
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ email: decoded.sub, roles: decoded.roles }); // basic info from JWT

      // Fetch fresh user profile from backend
      AuthService.getProfile(token)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("❌ Failed to fetch profile:", err);
          logout();
        });
    }
  }, [token]);

  // ✅ Login function
  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
