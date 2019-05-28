import React from "react";
import { NavLink } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import { auth as firebaseAuth, provider } from "../utils/firebaseConfig";
import loginButton from "../assets/img/btn_google_signin_dark_normal_web.png";
import logo from "../assets/img/logo.png";
import "./CSS/Navbar.css";
import { connect } from "react-redux";
import { logoutUser, updateUser } from "../redux/actions/userActions";
import { getToolsOwned } from "../redux/actions/toolActions";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0
    };
  }

  login = () => {
    this.getGeoLocation();

    firebaseAuth.signInWithPopup(provider).then(result => {
      const authObj = {
        uid: result.user.uid,
        lat: this.state.lat,
        long: this.state.lng,
        email: result.user.email,
        userName: result.user.displayName,
        avatar: result.user.photoURL
      };
      this.props.updateUser(authObj);
      this.props.getToolsOwned(authObj.uid);
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

  componentDidMount() {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        const parsedUser = {
          uid: user.uid,
          lat: this.state.lat,
          long: this.state.lng,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
        this.props.updateUser(parsedUser);
        this.props.getToolsOwned(parsedUser.uid);
      }
    });
  }

  render() {
    // grab and place google photo as profile button background-image
    var profilePhoto = "none";
    if (this.props.auth) {
      profilePhoto = `url(${this.props.auth.photoURL})`;
    }

    return (
      <nav className="nav-wrapper grey lighten-5">
        <div className="container">
          <img className="siteLogo" src={logo} />
          <ul className="right nav-list">
            {this.props.auth ? (
              <React.Fragment>
                <li>
                  <NavLink to="/" className="grey-text text-darken-3">
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
                    to="/"
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
                    onClick={this.login}
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
  getToolsOwned
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
