// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth Context
import { AuthProvider, useAuth } from './Domain/User/context/AuthContext';

// User Pages
import LoginForm from './Domain/User/UserLoginForm';
import RegisterForm from './Domain/User/UserRegisterForm';
import LandingPage from './Domain/LandingPage/LandingPage'; 
 
import AboutUs from "./Domain/LandingPage/LandingPageComponents/AboutUs/AboutUs.js";

// Delivery Partner Pages
import PickupRequestsList from "./Domain/DeliveryPartner/Component/PickupRequestsList.js";
import MyAssignedRequests from "./Domain/DeliveryPartner/Component/MyAssignedRequests.js";
import DeliveryPartnerDashboard from './Domain/DeliveryPartner/DeliveryPartnerDashboard.js';
import AdminDashboard from "./Domain/Admin/AdminDashboard.js";
import RegisterNewUser from "./Domain/Admin/RegisterNewUser.js";
import AllDeliveryPartners from './Domain/Admin/AllDeliveryPartners.js';

import MyPickUp from "./Domain/User/components/MyPickupRequests/MyPickupRequests.js"

import ProfilePage from "./Domain/User/components/Profile/ProfilePage.js";

import Shop from "./Domain/Shop/Shop.js";


import ManageRecyclableItems from './Domain/Admin/ManageRecyclableItems.js';

import LearnMore from "./Domain/LandingPage/LandingPageComponents/HeroSection/component/LearnMore.js";
import AllUsers from './Domain/Admin/AllUsers.js';


// 🔒 Protected route wrapper for Delivery Partner
const PartnerRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <p className="p-4 text-red-600">❌ Please log in to access this page.</p>;
  }

  if (!user.roles?.includes("ROLE_DELIVERY_PARTNER")) {
    return <p className="p-4 text-red-600">❌ Access Denied. Delivery Partner role required.</p>;
  }

  return children;
};


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />        
          <Route path="/shop" element={<Shop />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/DeliveryPartnerDashboard" element={<DeliveryPartnerDashboard/>}/>
          <Route path="/AdminDashboard" element={<AdminDashboard/>}/>

          {/* tesitng */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-items" element={<ManageRecyclableItems />} />
          <Route path="/admin/register-user" element={<RegisterNewUser />} />
          <Route path="/admin/all-delivery-partners" element={<AllDeliveryPartners />} />
          <Route path="/admin/all-users" element={<AllUsers />} />
          {/* tesitng  */}
    
          <Route path="/MyPickUp" element={<MyPickUp/>}/>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path='/Shop' element={<Shop/>}/>
          <Route path="/learn-more" element={<LearnMore />} />

          {/* 🚚 Delivery Partner Routes (Protected) */}
          <Route 
            path="/partner/requests" 
            element={
              <PartnerRoute>
                <PickupRequestsList />
              </PartnerRoute>
            } 
          />
          <Route 
            path="/partner/my-requests" 
            element={
              <PartnerRoute>
                <MyAssignedRequests />
              </PartnerRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
