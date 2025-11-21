 
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./LandingPageComponents/Footer/Footer.js"
import { AuthContext } from "../User/context/AuthContext.js";
import Nav from "./LandingPageComponents/NavegationBar/NavBar.js"
import BigImpact from "./LandingPageComponents/BigImpactSection/BigImpactSection.js"
import HeroSection from "./LandingPageComponents/HeroSection/HeroSection.js";
import HowItWorks from "./LandingPageComponents/HowItWorks/HowItWorks.js";
import ImpactResult from "./LandingPageComponents/ImpactResultSection/ImpactResult.js";
import TopContributor from "./LandingPageComponents/TopContributor/TopContributor.js"
import LiveContributor from "./LandingPageComponents/LiveContributor/LiveContributor.js"
import Join from "./LandingPageComponents/Join/Join.js"

 

function LandingPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If a superadmin is logged in, redirect them away from the landing page
    if (user?.roles?.includes("Admin") || user?.roles?.includes("ROLE_SUPERADMIN")) {
      navigate("/AdminDashboard");
    }
  }, [user, navigate]);

  // If the user is an admin, render nothing to prevent the landing page from flashing
  // before the redirect happens.
  if (user?.roles?.includes("superadmin") || user?.roles?.includes("ROLE_SUPERADMIN")) {
    return null;
  }

  return (
    <div className="landing">
      {/* Navbar */}
      <Nav/>      

      {/* Hero Section One */}      
       <HeroSection/>

      {/* Hero Section Two Impact */}
      <BigImpact/>

      {/* Hero Section Three How It Works */}
      <HowItWorks/>

      <ImpactResult/>

      <TopContributor/>

      <LiveContributor/>

      <Join/>



      {/* Footer */}
      <Footer/>

     


    </div>
  );
}

export default LandingPage;
