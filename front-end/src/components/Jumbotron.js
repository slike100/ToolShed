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
          <h4 className="underSlogan">A new way to rent tools from members of your community</h4>
          <SearchLandingPage />
        </div>
      </div>
    );
  }
}
export default Jumbotron;
