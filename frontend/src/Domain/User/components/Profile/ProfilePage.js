import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../User/context/AuthContext";
//import "./ProfilePage.css";

const ProfilePage = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState({});
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [msg, setMsg] = useState("");
  const { user, hasRole, logout } = useAuth();
  

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:8080/api/users/change-password",
        { oldPassword: oldPass, newPassword: newPass },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg("✅ Password changed successfully!");
      setOldPass("");
      setNewPass("");
    } catch (err) {
      setMsg("❌ Failed to change password. Check current password.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="profile-page">
      <h2>👤 My Profile</h2>
      <p><strong>Name:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Eco Points:</strong> 🌱 {profile.ecoPoints || 0}</p>

      <hr />

      <h3>🔒 Change Password</h3>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Current Password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>

      {msg && <p className="status-msg">{msg}</p>}
    </div>
  );
};

export default ProfilePage;
