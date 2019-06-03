import React, { Component } from "react";

import "materialize-css/dist/css/materialize.min.css";
import "../components/CSS/Jumbotron.css";

import image from "../assets/img/background.jpg";

import About from "./About";
import SearchLandingPage from '../components/SearchLandingPage';

class Jumbotron extends Component {
  render() {
    return (
      <div className="background">
        <div className="frontBanner">
          <h1 className="frontSlogan">Never Buy Another Tool</h1>
          <h4 className="underSlogan">A new way rent tools in your community</h4>

        </div>

        {/* <img src={image} className="jumbo" /> */}
        <SearchLandingPage />
        {/* <p className="baseline-text-bg">Way better than buying tools</p>
        <p class="baseline-text-bg">
          Rent thousands of tools from people all over your neighborhood
        </p> */}

      </div>

      // {/* <img src={image} className="responsive-img"/> */}
    );
  }
}
export default Jumbotron;
