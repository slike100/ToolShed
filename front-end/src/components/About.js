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
          <div className="savingMoney">
            <p className="question">Why do I need ToolShed?</p>
            <p className="answer">
              Have you ever started a new DIY project and come to realize that
              you didn't have the tool you needed to get the job done? You could
              buy a new tool for your one-time project and then leave it to
              collect dust in your garage. Or you could let ToolShed help you
              find that tool to rent, so you don't have to buy it yourself.{" "}
            </p>
            <p className="question">How does ToolShed Work?</p>
            <p className="answer">
              Search for tools to rent near a location of your choice. <br />{" "}
              Choose a tool and use in-app payment to check it out. <br /> Get
              in contact with the tool owner to organize pick up and drop off
              times.{" "}
            </p>
          </div>

          <img className="moneyPig" src={picture2} alt="moneyPig" />

          <p className="connectingTitle titleBorder">
            Connecting you to the tools you need now
          </p>
          <div className="connectingPeople">
            <p className="question">Favorite Tool:</p>
            <p className="answer">Hammer</p>
            <p className="question">What brought you to ToolShed?</p>
            <p className="answer">My love of hammers</p>
            <p className="question">Favorite DIY project?</p>
            <p className="answer">Nailing things with my hammer</p>
          </div>
          <div className="lionContainer connectionPicture">
            <img src={picture4} alt="Monkey" />
            <p>David Brown</p>
          </div>

          <p className="profitTitle titleBorder">
            Profit off your unused tools
          </p>
          <div className="profit">
            <p className="question">Favorite Tool:</p>
            <p className="answer">Hammer</p>
            <p className="question">What brought you to ToolShed?</p>
            <p className="answer">My love of hammers</p>
            <p className="question">Favorite DIY project?</p>
            <p className="answer">Nailing things with my hammer</p>
          </div>

          <div className="celebrationPicture">
            <img src={picture3} alt="Monkey" />
            <p>Julio Parra-Sanchez</p>
          </div>

          <p className="fourthTitle titleBorder">
            Save money on one-time projects{" "}
          </p>
          <div className="fourth">
            <p className="question">Favorite Tool:</p>
            <p className="answer">Hammer</p>
            <p className="question">What brought you to ToolShed?</p>
            <p className="answer">My love of hammers</p>
            <p className="question">Favorite DIY project?</p>
            <p className="answer">Nailing things with my hammer</p>
          </div>

          <div className="fourthPicture">
            <img src={picture3} alt="Monkey" />
            <p>Sam Morgan</p>
          </div>

          <p className="fifthTitle titleBorder">
            Expensive tools pay for themselves
          </p>
          <div className="fifth">
            <p className="question">Favorite Tool:</p>
            <p className="answer">Hammer</p>
            <p className="question">What brought you to ToolShed?</p>
            <p className="answer">My love of hammers</p>
            <p className="question">Favorite DIY project?</p>
            <p className="answer">Nailing things with my hammer</p>
          </div>
          <div className="fifthPicture">
            <img src={picture3} alt="Monkey" />
            <p>Dan Scanland</p>
          </div>

          <p className="sixthTitle titleBorder">Meet new people</p>
          <div className="sixth">
            <p className="question">Favorite Tool:</p>
            <p className="answer">Hammer</p>
            <p className="question">What brought you to ToolShed?</p>
            <p className="answer">My love of hammers</p>
            <p className="question">Favorite DIY project?</p>
            <p className="answer">Nailing things with my hammer</p>
          </div>
          <div className="sixthPicture">
            <img src={picture3} alt="Monkey" />
            <p>Nathaniel Wendt</p>
          </div>

          <p className="seventhTitle titleBorder">
            Become the DIY Master <br /> you were meant to be
          </p>
          <div className="seventh">
            <p className="question">Favorite Tool:</p>
            <p className="answer">Hammer</p>
            <p className="question">What brought you to ToolShed?</p>
            <p className="answer">My love of hammers</p>
            <p className="question">Favorite DIY project?</p>
            <p className="answer">Nailing things with my hammer</p>
          </div>
          <div className="seventhPicture">
            <img src={picture3} alt="Monkey" />
            <p>Sam Sliker</p>
          </div>
        </section>
      </div>
    );
  }
}
export default About;
