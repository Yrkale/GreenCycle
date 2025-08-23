import React from "react";
 
import Footer from "./LandingPageComponents/Footer/Footer.js"
import Nav from "./LandingPageComponents/NavegationBar/NavBar.js"
import BigImpact from "./LandingPageComponents/BigImpactSection/BigImpactSection.js"
import HeroSection from "./LandingPageComponents/HeroSection/HeroSection.js";
import HowItWorks from "./LandingPageComponents/HowItWorks/HowItWorks.js";
import ImpactResult from "./LandingPageComponents/ImpactResultSection/ImpactResult.js";
import TopContributor from "./LandingPageComponents/TopContributor/TopContributor.js"
import LiveContributor from "./LandingPageComponents/LiveContributor/LiveContributor.js"
import Join from "./LandingPageComponents/Join/Join.js"

function LandingPage() {
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
