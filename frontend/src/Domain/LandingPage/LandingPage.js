import React from "react";
import "./LandingPage.css";
import Footer from "./LandingPageComponents/Footer/Footer.js"
import Nav from "./LandingPageComponents/NavegationBar/NavBar.js"
import ImpactSection from "./LandingPageComponents/ImpactSection/ImpactSection.js"
import HeroSection from "./LandingPageComponents/HeroSection/HeroSection.js";
import HowItWorks from "./LandingPageComponents/HowItWorks/HowItWorks.js";

function LandingPage() {
  return (
    <div className="landing">
      {/* Navbar */}
      <Nav/>      

      {/* Hero Section One */}      
       <HeroSection/>

      {/* Hero Section Two Impact */}
      <ImpactSection/>

      {/* Hero Section Three How It Works */}
      <HowItWorks/>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default LandingPage;
