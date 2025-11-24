import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "./LandingPageComponents/Footer/Footer.js";
import { AuthContext } from "../User/context/AuthContext.js";
import Nav from "./LandingPageComponents/NavegationBar/NavBar.js";
import BigImpact from "./LandingPageComponents/BigImpactSection/BigImpactSection.js";
import HeroSection from "./LandingPageComponents/HeroSection/HeroSection.js";
import HowItWorks from "./LandingPageComponents/HowItWorks/HowItWorks.js";
import ImpactResult from "./LandingPageComponents/ImpactResultSection/ImpactResult.js";
import TopContributor from "./LandingPageComponents/TopContributor/TopContributor.js";
import LiveContributor from "./LandingPageComponents/LiveContributor/LiveContributor.js";
import Join from "./LandingPageComponents/Join/Join.js";

function LandingPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return; // Not logged in → show landing page

    // ⭐ Case 1: Admin
    if (user.role === "SUPER_ADMIN" || user.role === "ADMIN") {
      navigate("/AdminDashboard");
      return;
    }

    // ⭐ Case 2: Delivery Partner
    if (user.role === "DELIVERY_PARTNER") {
      navigate("/DeliveryPartnerDashboard");
      return;
    }

    // ⭐ Case 3: Normal USER
    // — Do nothing, let them see Landing Page
  }, [user, navigate]);

  // ❗ While redirecting, avoid flashing landing page
  if (
    user?.role === "SUPER_ADMIN" ||
    user?.role === "ADMIN" ||
    user?.role === "DELIVERY_PARTNER"
  ) {
    return null;
  }

  return (
    <div className="landing">
      <Nav />
      <HeroSection />
      <BigImpact />
      <HowItWorks />
      <ImpactResult />
      <TopContributor />
      <LiveContributor />
      <Join />
      <Footer />
    </div>
  );
}

export default LandingPage;


