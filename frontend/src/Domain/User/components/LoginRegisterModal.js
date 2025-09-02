import React, { useState, useContext } from "react";
// NOTE: keep this import path exactly as your folder name is spelled.
// If your folder is "services", change "serviecs" -> "services".
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import "./LoginRegisterModal.css";



const LoginRegisterModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login: loginContext } = useContext(AuthContext);

  if (!isOpen) return null;

  const extractToken = (data) =>
    data?.accessToken || data?.token || data?.jwt || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    try {
      if (isLogin) {
        // ---------- LOGIN ----------
        const res = await AuthService.login({
          email: email,
          password: password,
        });

        // Axios responses always keep payload in res.data
        const data = res?.data ?? res;
        console.log("[Login] raw response:", data);
        console.log("pxpx",data.roles)

        



        const token = extractToken(data);
        if (!token) {
          // Show full response in console to help debugging
          console.error("[Login] No token field found in response:", data);
          throw new Error(
            "Login succeeded but server did not return a token field."
          );
        }

        // Save token & update global auth (AuthContext will call /me)
        localStorage.setItem("token", token);
        await loginContext(token);

        // Success → close modal
        onClose();
      } else {
        // ---------- REGISTER ----------
        const res = await AuthService.register({
          username,
          email,
          password,
          role: ["user"],
        });
        console.log("[Register] raw response:", res?.data ?? res);

        // After successful register, switch to login tab
        setIsLogin(true);
      }
    } catch (err) {
      console.error("❌ Auth error:", err);

      // Prefer backend message if present
      const backendMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.detail ||
        err?.message ||
        "Request failed";

      setErrorMsg(backendMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button className="modal-close" onClick={onClose} aria-label="Close"> </button>

        <h2>{isLogin ? "Sign In" : "Register"}</h2>

        {/* Inline error */}
        {errorMsg && <div className="form-error">{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          <button type="submit" className="btn primary" disabled={submitting}>
            {submitting ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span onClick={() => { setIsLogin(!isLogin); setErrorMsg(""); }}>
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginRegisterModal;
