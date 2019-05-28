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
import UserToolCard from "./UserToolCard"
import RentedToolCard from "./RentedToolCard"


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
      <div className="body">
        <div className="row profileScroll">
          {/* <div className="col s12 manage">
            Manage Your Shed
          </div> */}


          <div className="col s4">
            <div class="col s12">
              <div className="user1">
                <img className="circle responsive-img userImg z-depth-3" src="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="" />
              </div>
              <span>USER NAME</span>
              <span>USER EMAIL</span>
              <button className="btn-small waves-effect #e53935 red darken-1 deleteUser" type="submit" name="action">Delete Account</button>
            </div>

            <button class="btn-large waves-effect waves-light" type="submit" name="action">Add A Tool</button>

          </div>
          <div className="col s4 toolsOwned">
            Tools Owned

            <UserToolCard />
            <UserToolCard />
            <UserToolCard />
          </div>
          <div className="col s4 toolsRenting">
            Tools Rented
            <RentedToolCard />
            <RentedToolCard />
            <RentedToolCard />
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

