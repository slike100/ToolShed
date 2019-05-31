import React, { Component } from "react";

import "./CSS/About.css";

import picture0 from "../assets/img/undraw_savings_hjfl.svg";
import picture1 from "../assets/img/undraw_connected_8wvi.svg";
import picture2 from "../assets/img/undraw_celebration_0jvk.svg";
import picture3 from "../assets/img/vincent-van-zalinge-396729-unsplash.jpg";
import picture4 from "../assets/img/luke-tanis-454346-unsplash.jpg";
class About extends Component {
  render() {
    return (
      <div>
        <section id="aboutSection">
          <p className="moneyTitle titleBorder">
            Helping you get projects done faster
          </p>
          <p className="savingMoney">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <img className="moneyPig" src={picture2} alt="moneyPig" />
          <p className="connectingTitle titleBorder">
            Connecting you to the tools you need now
          </p>
          <p className="connectingPeople">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="lionContainer connectionPicture">
            <img src={picture4} alt="Monkey" />
            <p>C</p>
          </div>

          <p className="profitTitle titleBorder">Profit of your unused tools</p>
          <p className="profit">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="celebrationPicture">
            <img src={picture3} alt="Monkey" />
            <p>David Brown</p>
          </div>

          <p className="fourthTitle titleBorder">Third Person</p>
          <p className="fourth">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="fourthPicture">
            <img src={picture3} alt="Monkey" />
            <p>David Brown</p>
          </div>

          <p className="fifthTitle titleBorder">Fourth Person</p>
          <p className="fifth">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="fifthPicture">
            <img src={picture3} alt="Monkey" />
            <p>David Brown</p>
          </div>

          <p className="sixthTitle titleBorder">Fith Person</p>
          <p className="sixth">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="sixthPicture">
            <img src={picture3} alt="Monkey" />
            <p>David Brown</p>
          </div>

          <p className="seventhTitle titleBorder">Sixth Person</p>
          <p className="seventh">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="seventhPicture">
            <img src={picture3} alt="Monkey" />
            <p>David Brown</p>
          </div>
        </section>
      </div>
    );
  }
}
export default About;
