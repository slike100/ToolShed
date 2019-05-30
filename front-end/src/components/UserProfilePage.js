import React from "react";
import { connect } from "react-redux";
import CheckoutForm from "./stripe";
import { Elements, StripeProvider } from "react-stripe-elements";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { auth as firebaseAuth, provider } from "../utils/firebaseConfig";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import options from "materialize-css/dist/js/materialize.min.js";
import "./CSS/UserProfilePage.css";
import UserToolCard from "./UserToolCard";
import RentedToolCard from "./RentedToolCard";
import AddToolForm from "./AddToolForm";
import Checkout from "./Checkout";
import { deleteUser } from "../redux/actions/userActions";

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkOutModal: false
    };
  }

  toggle = e => {
    this.setState(prevState => ({
      checkOutModal: !this.state.checkOutModal
    }));
  };

  deleteUser = async () => {
    const { uid, toolsOwned } = this.props.user;
    console.log(uid, toolsOwned);
    var deleteObj = {
      uid: uid,
      toolsOwned: toolsOwned
    };
    await this.props.deleteUser(deleteObj);
    var currentUser = firebaseAuth.currentUser;
    currentUser.delete().then(function() {
      console.log("user deleted");
    });
  };

  render() {
    // var modal;
    // if (this.state.checkOutModal === true) {
    //   modal = (
    //     <div>
    //       <AddToolForm onToggle={this.toggle} />
    //     </div>
    //   );
    // } else {
    //   modal = <div />;
    // }

    var modal;
    modal = (
      <div>
        <AddToolForm />
      </div>
    );

    // grab and place google photo as profile button background-image
    var profilePhoto = "none";
    if (this.props.auth) {
      profilePhoto = `url(${this.props.auth.photoURL})`;
    }
    if (!this.props.user) {
      return <div>Loading...</div>;
    } else
      return (
        <div className="body">
          <div className="row profileScroll">
            <div className="col s4">
              <div className="col s12">
                <div className="user1">
                  <img
                    className="circle responsive-img userImg z-depth-3"
                    src={this.props.user.avatar}
                    alt=""
                  />
                </div>
                <h5>{this.props.user.displayName}</h5>
                <h6>{this.props.user.email}</h6>
                <button
                  className="btn-small waves-effect #e53935 red darken-1 deleteUser"
                  type="submit"
                  name="action"
                  onClick={this.deleteUser}
                >
                  Delete Account
                </button>
              </div>
              {modal}

              <button
                class="btn-large waves-effect waves-light btn modal-trigger"
                type="submit"
                name="action"
                data-target="addToolModal"
                // onClick={this.toggle}
              >
                Add A Tool
              </button>
            </div>
            <div className="col s4 toolsOwned">
              Tools Owned
              <UserToolCard />
            </div>
            <div className="col s4 toolsRenting">
              Tools Rented
              <RentedToolCard />
            </div>
          </div>
          {modal}
        </div>
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
  deleteUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePage);
