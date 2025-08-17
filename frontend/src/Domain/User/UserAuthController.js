import { login, register } from './UserAuthService';

export const handleRegister = async (userData, setMessage) => {
  try {
    const response = await register(userData);
    setMessage(response.message || 'Registration successful!');
  } catch (err) {
    setMessage(err.response?.data?.message || 'Registration failed');
  }
};

export const handleLogin = async (userData, setMessage) => {
  try {
    const response = await login(userData);
    setMessage('Login successful');
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  } catch (err) {
    setMessage(err.response?.data?.message || 'Login failed');
  }
};
