import React, { Component } from "react";

import "../components/CSS/LandingPage.css";
import "materialize-css/dist/css/materialize.min.css";
// COMPONENT
import Navbar from "./Navbar";
import About from "./About";
import Jumbotron from "./Jumbotron";
import SearchLandingPage from "./SearchLandingPage";
//

class LandingPage extends Component {
  render() {
    return (
      <div>
        {/* <Navbar />  */}
        <Jumbotron />
        
        <About />
      </div>
    );
  }
}
export default LandingPage;
