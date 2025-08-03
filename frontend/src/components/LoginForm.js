// src/components/LoginForm.js
import React, { useState } from 'react';
import { login } from '../services/AuthService';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      alert('Login successful!');
      console.log('JWT:', response.data.token);
    } catch (error) {
      alert('Login failed');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
