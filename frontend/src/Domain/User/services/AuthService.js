import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth";

// ---------------- REGISTER ----------------
const register = async (userData) => {
  const payload = {
    username: userData.username?.trim(),
    email: userData.email?.trim(),
    password: userData.password,
    role: userData.role || ["user"], // default role if not provided
  };

  return axios.post(`${API_URL}/signup`, payload, {
    headers: { "Content-Type": "application/json" },
  });
};

// ---------------- LOGIN ----------------
const login = async (userData) => {
  const payload = {
    email: userData.email?.trim(),
    password: userData.password,
  };

  const response = await axios.post(`${API_URL}/login`, payload, {
    headers: { "Content-Type": "application/json" },
  });

  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

// ---------------- GET PROFILE ----------------
const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  return axios.get("http://localhost:8080/api/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ---------------- DECODE JWT ----------------
const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token); // gives {sub, email, roles, exp, ...}
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

// ---------------- LOGOUT ----------------
const logout = () => {
  localStorage.removeItem("token");
};

export default {
  register,
  login,
  getProfile,
  getCurrentUser,
  logout,
};
