import React from "react";
import { NavLink } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import { auth, provider } from '../utils/firebaseConfig';
import loginButton from '../assets/img/btn_google_signin_dark_normal_web.png'
import logo from '../assets/img/logo.png';
import './Navbar.css';


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
        }
        this.setState({
          user
        });
      });
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
        });
      });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const parsedUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }
        this.setState({ user: parsedUser });
      }
    });
  }

  render() {
    return (
      <nav className="nav-wrapper grey lighten-5">
        <div className="container">
          <img className="siteLogo" src={logo} />
          <ul className="right nav-list">
            <li><NavLink to='/' className="grey-text text-darken-3">Post a Tool</NavLink></li>
            {this.state.user ?
              <React.Fragment>
                <li><NavLink to='/' className="grey-text text-darken-3" onClick={this.logout}>Logout</NavLink></li>

              </React.Fragment>
              :
              <li><img className="loginBtn" src={loginButton} onClick={this.login} /></li>
            }
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;
