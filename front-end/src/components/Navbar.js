import "./CSS/Navbar.css";
import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import loginButton from "../assets/img/btn_google_signin_dark_normal_web.png";
import logo from "../assets/img/logo.png";
import { NavLink } from "react-router-dom";
import { auth as firebaseAuth, provider } from "../utils/firebaseConfig";
import { connect } from "react-redux";
import {
  getToolsOwned,
  getToolsRented,
  toolSearchLocation,
  clearToolSearch
} from "../redux/actions/toolActions";
import axios from "axios";
import { userBaseUrl } from "../utils/globalConstants";
import {
  logoutUser,
  updateUser,
  addNewUser
} from "../redux/actions/userActions";
const firebase = require("firebase");

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0
    };
  }

  //checkForExistingUser fires for both login and sign-up buttons
  //It would be good to add if user clicks sign-up and they already have an account, an alert or modal informing them that their account already exists.
  checkForExistingUser = e => {
    firebaseAuth.signInWithPopup(provider).then(async result => {
      return await axios
        .get(`${userBaseUrl}userData/${result.user.uid}`)
        .then(res => {
          if (res.status === 200 && res.data.userName) {
            this.login(result);
            console.log(
              "There is an existing user w name: ",
              res.data.userName
            );
          } else {
            this.signUp(result);
            console.log("This is a new user");
            return false;
          }
        })
        .catch(err => {
          console.log("Error getting user data: ", err);
        });
    });
  };

  signUp = async result => {
    await this.getGeoLocation();
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
  };

  login = async result => {
    await this.getGeoLocation();
    const authObj = {
      uid: result.user.uid,
      lat: this.state.lat,
      long: this.state.lng
    };
    this.props.updateUser(authObj);
    this.props.getToolsOwned(authObj.uid);
    this.props.getToolsRented(authObj.uid);
    // });
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

  //First iteration of persistent login-in below. Should be done properly with firebase auth SDK and index DB.
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

  // handleClick = () => {
  //   this.props.clearToolSearch();
  // };
  render() {
    // grab and place google photo as profile button background-image
    var profilePhoto = "none";
    if (this.props.auth) {
      profilePhoto = `url(${this.props.user.avatar})`;
    }

    return (
      <nav className="nav-wrapper grey lighten-5">
        <NavLink
          to="/"
          // onClick={this.handleClick}
        >
          <img className="siteLogo" src={logo} />
        </NavLink>
        <ul className="right nav-list">
          {this.props.auth ? (
            <React.Fragment>
              <li>
                <NavLink to="/search" className="grey-text text-darken-3">
                  Search
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
                  className="btn btn-floating blue lighten-1"
                  style={{
                    backgroundImage: profilePhoto,
                    backgroundSize: "cover"
                  }}
                />
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <NavLink to="/search" className="grey-text text-darken-3">
                  Search
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="grey-text text-darken-3"
                  onClick={this.checkForExistingUser}
                >
                  Sign Up
                </NavLink>
              </li>
              <li>
                <img
                  id="googleLogin"
                  className="loginBtn nav-right"
                  src={loginButton}
                  onClick={this.checkForExistingUser}
                />
              </li>
            </React.Fragment>
          )}
        </ul>
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
  addNewUser,
  toolSearchLocation,
  clearToolSearch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
