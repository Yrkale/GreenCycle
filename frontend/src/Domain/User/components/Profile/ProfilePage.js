import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../User/context/AuthContext";
import "./ProfilePage.css"; // optional but recommended for styling

const ProfilePage = () => {
  const { token, logout } = useAuth();
  const [profile, setProfile] = useState({});
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // ✅ for success/error color

  // ✅ Fetch profile info (username, email, ecoPoints)
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
      setMsg("❌ Failed to load profile. Please try again later.");
      setMsgType("error");
    }
  };

  // ✅ Change password handler
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:8080/api/user/change-password",
        { oldPassword: oldPass, newPassword: newPass },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg("✅ Password changed successfully!");
      setMsgType("success");
      setOldPass("");
      setNewPass("");
    } catch (err) {
      console.error("Password change failed:", err);
      setMsg("❌ Failed to change password. Check your current password.");
      setMsgType("error");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="profile-page">
      <h2>👤 My Profile</h2>

      {profile ? (
        <div className="profile-info">
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Eco Points:</strong>{" "}
            <span className="eco-points">🌱 {profile.ecoPoints || 0}</span>
          </p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <hr />

      <h3>🔒 Change Password</h3>
      <form onSubmit={handleChangePassword} className="password-form">
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

      {msg && <p className={`status-msg ${msgType}`}>{msg}</p>}

      <hr />

      
    </div>
  );
};

export default ProfilePage;
