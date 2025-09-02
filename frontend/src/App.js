// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './Domain/User/UserLoginForm';
import RegisterForm from './Domain/User/UserRegisterForm';
import LandingPage from './Domain/LandingPage/LandingPage'; // Import Landing Page
import Shop from "./Domain/Shop/Shop"; 
import AboutUs from "./Domain/LandingPage/LandingPageComponents/AboutUs/AboutUs.js";

function App() {
  return (
    <Router>     

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />        
        <Route path="/shop" element={<Shop />} />
        <Route path="/AboutUs" element={<AboutUs />} />
         
      </Routes>
      
    </Router>
  );
}

export default App;
