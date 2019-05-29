import React, { Component } from 'react';


import './CSS/About.css';

import picture0 from '../assets/img/undraw_savings_hjfl.svg';
import picture1 from '../assets/img/undraw_connected_8wvi.svg';
import picture2 from '../assets/img/undraw_celebration_0jvk.svg';
import picture3 from '../assets/img/vincent-van-zalinge-396729-unsplash.jpg';
import picture4 from '../assets/img/luke-tanis-454346-unsplash.jpg';
class About extends Component {


render(){
    return(
        <div>
            <section id="aboutSection">
                <p className="moneyTitle titleBorder">Helping you get projects done faster</p>
                <p className="savingMoney">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <img className="moneyPig" src={picture0} alt="Saving Money"/>
                <p className="connectingTitle titleBorder">Connecting you to the tools you need now</p>
                <p className="connectingPeople">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <img className="connectionPicture" src={picture1} alt="Connecting People" />
                <p className="profitTitle titleBorder">Profit of your unused tools</p>
                <p className="profit">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <img className="celebrationPicture" src={picture2} alt="Celebration" />
                
                {/* TEAM SECTION */}

                <p className="teamTitle titleBorder">Our Team</p>
                <div className="monkeyContainer">
                    <img src={picture3} alt="Monkey"/>
                    <p>CEO - Natalie Hayes</p>
                </div>
                <p className="monkeyDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                <div className="lionContainer">
                    <img src={picture4} alt="Monkey"/>
                    <p>CMO - Li Palmer</p>
                </div>
                <p className="owlDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </section>
        </div>
        );
    }
}
export default About;