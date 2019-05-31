import React from "react";
import { NavLink } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import { auth as firebaseAuth, provider } from "../utils/firebaseConfig";
import loginButton from "../assets/img/btn_google_signin_dark_normal_web.png";
import logo from "../assets/img/logo.png";
import "./CSS/Navbar.css";
import { connect } from "react-redux";
import {
  logoutUser,
  updateUser,
  addNewUser
} from "../redux/actions/userActions";
import { getToolsOwned, getToolsRented } from "../redux/actions/toolActions";
const firebase = require("firebase");

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0
    };
  }

  signUp = () => {
    this.getGeoLocation();

    firebaseAuth.signInWithPopup(provider).then(result => {
      const authObj = {
        uid: result.user.uid,
        lat: this.state.lat,
        long: this.state.lng,
        email: result.user.email,
        userName: result.user.displayName,
        avatar: result.user.photoURL,
        toolsOwned: [],
        toolsBeingRented: [],
        recordIds: [],
        stripeToken: ""
      };
      this.props.addNewUser(authObj);
    });
  };

  login = () => {
    this.getGeoLocation();
    firebaseAuth.signInWithPopup(provider).then(result => {
      const authObj = {
        uid: result.user.uid,
        lat: this.state.lat,
        long: this.state.lng
      };
      this.props.updateUser(authObj);
      this.props.getToolsOwned(authObj.uid);
      this.props.getToolsRented(authObj.uid);
    });
  };

  logout = () => {
    firebaseAuth.signOut().then(() => {
      this.props.logoutUser();
    });
  };

  getGeoLocation = () => {
    const change_state = objLocation => {
      this.setState({
        lat: objLocation.lat,
        lng: objLocation.lng
      });
    };
    var options = {
      enableHighAccuracy: true,
      timeout: 5000, // wait time
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(
      function(position) {
        let objLocation = {
          lat: position.coords.latitude, // Latitude
          lng: position.coords.longitude // Longitude
        };

        change_state(objLocation); //Invoke Function to change the local state
      },
      function(error) {
        if (error.code == 1) {
          alert("Error: Access is denied!");
        } else if (error.code == 2) {
          alert("Error: Position is unavailable!");
        }
      },
      options
    );
  };

  //GETTING RID OF PERSISTENT LOGIN
  // componentDidMount() {
  //   firebaseAuth.onAuthStateChanged(user => {
  //     if (user) {
  //       const parsedUser = {
  //         uid: user.uid,
  //         lat: this.state.lat,
  //         long: this.state.lng
  //       };
  //       this.props.updateUser(parsedUser);
  //       this.props.getToolsOwned(parsedUser.uid);
  //       this.props.getToolsRented(parsedUser.uid);
  //     }
  //   });
  // }

  render() {
    // grab and place google photo as profile button background-image
    var profilePhoto = "none";
    if (this.props.auth) {
      profilePhoto = `url(${this.props.user.avatar})`;
    }

    return (
      <nav className="nav-wrapper grey lighten-5">
        <div className="container">
          <NavLink to="/">
            <img className="siteLogo" src={logo} />
          </NavLink>
          <ul className="right nav-list">
            {this.props.auth ? (
              <React.Fragment>
                <li>
                  <NavLink
                    to="/userProfilePage"
                    className="grey-text text-darken-3"
                  >
                    Post a Tool
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="grey-text text-darken-3"
                    onClick={this.logout}
                  >
                    Logout
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/userProfilePage"
                    style={{
                      backgroundImage: profilePhoto,
                      backgroundSize: "cover"
                    }}
                    className="btn btn-floating blue lighten-1"
                  />
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  <NavLink
                    to="/"
                    className="grey-text text-darken-3"
                    onClick={this.signUp}
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <img
                    className="loginBtn"
                    src={loginButton}
                    onClick={this.login}
                  />
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.user.auth,
    user: state.user.user
  };
}

const mapDispatchToProps = {
  logoutUser,
  updateUser,
  getToolsOwned,
  getToolsRented,
  addNewUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
