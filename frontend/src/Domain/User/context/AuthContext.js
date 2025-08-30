import React, { createContext, useState, useEffect } from "react";
import AuthService from "../serviecs/AuthService";//"services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(AuthService.getCurrentUser());

  // Run once when app loads → restore session
  useEffect(() => {
    const storedUser = AuthService.getCurrentUser();
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (credentials) => {
    const data = await AuthService.login(credentials);
    setUser(data);
    return data;
  };

  const register = async (info) => {
    return await AuthService.register(info);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
