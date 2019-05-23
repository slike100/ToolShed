import React from "react";
import { connect } from "react-redux";
import firebase, { auth, provider } from '../utils/firebaseConfig';

// import actions here if needed

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  googleLogin = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
        }
        console.log(user);
        // const user = result.user;
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
        console.log('this is the refreshed user: ', parsedUser);
        this.setState({ user: parsedUser });
      }
    });
  }

  render() {
    return (
      <div>
        <header>
          <div className="wrapper">
            <h1>Login / Sign up</h1>
            {this.state.user ?
              <button onClick={this.logout}>Logout</button>
              :
              <button onClick={this.googleLogin}>Login with Google</button>
            }
          </div>
        </header>
      </div>
    )
  }
}

export default Login;