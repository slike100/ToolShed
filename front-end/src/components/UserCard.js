import "materialize-css/dist/css/materialize.min.css";
// import './CSS/UserProfilePage.css';
import React from "react";
import { connect } from "react-redux";
import './CSS/UserCard.css';


class UserCard extends React.Component {
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
        <div className="card userCard">
          <div className="card-image">
            <img src="https://images.unsplash.com/photo-1513467655676-561b7d489a88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
          </div>
          <div className="card-content">
            <span className="card-title">Card Title</span>

            <p>I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
          </div>
          <div className="card-action">
            <a href="#">This is a link</a>
          </div>
        </div>
        {/* </div> */}
      </div>
    )
  }

}

export default UserCard;