import React, { Component } from 'react';

import "materialize-css/dist/css/materialize.min.css";
import '../components/CSS/Jumbotron.css'; // CSS FILES
import image from '../assets/img/LandingPageImage.jpg';
import About from './About';
class Jumbotron extends Component {

    render(){
        return(
            // <img src={image} alt="logo" />
            <div>
                <div class="slogan">
                    <p class="mainSlogan">Way better than buying tools</p>
                    <p class="">Rent thousands of tools from people all over your neighborhood</p>
                </div>
                
                <img src={image} className="responsive-img"/>
            </div>
        )
    }

}
export default Jumbotron;