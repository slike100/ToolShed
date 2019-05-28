import "materialize-css/dist/css/materialize.min.css";
// import './CSS/UserProfilePage.css';
import React from "react";
import { connect } from "react-redux";

import './CSS/RentedToolCard.css';

class RentedToolCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }


  render() {
    // grab and place google photo as profile button background-image
    var profilePhoto = "none";
    if (this.props.auth) {
      profilePhoto = `url(${this.props.auth.photoURL})`;
    }
    return (
      <div className="row1">

        <div className="card toolCard">
          <div className="card-image">
            <img src="https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
          </div>
          <div className="card-content">
            <span className="card-title">Tool Name</span>
            {/* <p>I am a very simple card. I am good at containing small bits of information.</p> */}
            <h6>DUE DATE</h6>
          </div>
          <div className="card-action return">
            <h6>Contact Owner: test@test</h6>

          </div>
        </div>
      </div>
    )
  }

}

export default RentedToolCard;