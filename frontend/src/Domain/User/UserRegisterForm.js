// src/components/RegisterForm.js
import React, { useState } from 'react';
import { register } from './UserAuthService';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
