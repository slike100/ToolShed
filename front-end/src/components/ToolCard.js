import "materialize-css/dist/css/materialize.min.css";
// import './CSS/UserProfilePage.css';
import React from "react";
import { connect } from "react-redux";

import './CSS/ToolCard.css';

class ToolCard extends React.Component {
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
      <div className="row">

        {/* <div className="col s12 m7"> */}
        <div className="card toolCard">
          <div className="card-image">
            <img src="https://images.unsplash.com/photo-1513467655676-561b7d489a88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
          </div>
          <div className="card-content">
            <span className="card-title">Tool Name</span>

            <p>I am a very simple card. I am good at containing small bits of information.</p>
          </div>
          <div className="card-action">
            <button className="btn-small waves-effect waves-light" type="submit" name="action">Edit Tool</button>
            <button className="btn-small waves-effect #e53935 red darken-1" type="submit" name="action">Delete Tool</button>
          </div>
        </div>
      </div>
      // </div>
    )
  }

}

export default ToolCard;