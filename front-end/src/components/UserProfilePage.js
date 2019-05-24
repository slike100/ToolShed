import React from "react";
import { connect } from "react-redux";
import CheckoutForm from "./stripe";
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { auth as firebaseAuth, provider } from "../utils/firebaseConfig";
import "materialize-css/dist/css/materialize.min.css";
import './CSS/UserProfilePage.css';
import UserCard from "./UserCard"
import ToolCard from "./ToolCard"


class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  deleteUser = () => {
    var currentUser = firebaseAuth.currentUser;
    currentUser.delete().then(function () {
      console.log("user deleted");
    });
  };

  render() {
    // grab and place google photo as profile button background-image
    var profilePhoto = "none";
    if (this.props.auth) {
      profilePhoto = `url(${this.props.auth.photoURL})`;
    }
    return (
      <div>
        <div className="row">
          <div className="col1 s12">Manage Your Shed</div>
          <div className="col s4">
            User
            <UserCard />

          </div>
          <div className="col s4">
            Tools Owned
              <button class="btn-large waves-effect waves-light" type="submit" name="action">Add A Tool</button>
            <ToolCard />
          </div>
          <div className="col s4">
            Tools Rented
            <ToolCard />
          </div>
        </div>

      </div >
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.user.auth
  };
}

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePage);

