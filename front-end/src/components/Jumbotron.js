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
        
        {/* <img src={image} className="jumbo" /> */}
        <SearchLandingPage/>
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
