import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

class AuthService {
  // Register new user
  async register(userData) {
    return await axios.post(`${API_URL}/signup`, userData, { withCredentials: true });
  }

  // Login user
  async login(userData) {
    const res = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });

    if (res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data)); // save session
    }
    return res.data;
  }

  // Logout user
  logout() {
    localStorage.removeItem("user");
  }

  // Get current logged user
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
