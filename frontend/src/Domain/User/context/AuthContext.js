// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import AuthService from "../services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("🔑 Decoded JWT:", decoded);

        // ✅ Set basic user object from JWT
        setUser({
          email: decoded.sub,
          roles: decoded.roles || [], // fallback if present in JWT
          username: decoded.username || decoded.sub?.split("@")[0] || null,
        });

        // ✅ Fetch fresh profile from backend
        AuthService.getProfile()
          .then((res) => {
            console.log("🌍 Backend profile:", res.data);

            // Normalize authorities -> roles
            const roles =
              res.data.authorities?.map((a) => a.authority) || decoded.roles || [];

            const normalizedUser = {
              ...res.data,
              roles, // 👈 now always available
            };

            setUser(normalizedUser);
            localStorage.setItem("user", JSON.stringify(normalizedUser));
          })
          .catch((err) => {
            console.error("❌ Failed to fetch profile:", err);
            logout();
          });
      } catch (e) {
        console.error("❌ Invalid token:", e);
        logout();
      }
    }
  }, [token]);

  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");

  const hasRole = (role) => context?.user?.roles?.includes(role);

  return { ...context, hasRole };
};
