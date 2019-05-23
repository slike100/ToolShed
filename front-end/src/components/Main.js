import React from "react";
import { connect } from "react-redux";
import firebase, { auth, provider } from '../utils/firebaseConfig';

// import actions here if needed

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  // handleChange = (e) => {

  // }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
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
        this.setState({ user });
      }
    });
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <header>
          <div className="wrapper">
            <h1>ToolShed</h1>
            {this.state.user ?
              <button onClick={this.logout}>Logout</button>
              :
              <button onClick={this.login}>Login</button>
            }
          </div>
        </header>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // count: state.tool.count
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
