import React from "react";
import { connect } from "react-redux";
import CheckoutForm from "./stripe";
import { Elements, StripeProvider } from "react-stripe-elements";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./Navbar";
import SearchPage from "./SearchPage";
import AddToolForm from "./AddToolForm";
import About from "./About";
import CreateNewUserForm from "./CreateNewUserForm";
import UserProfilePage from "./UserProfilePage";
import LandingPage from "./LandingPage";
import Checkout from "./Checkout";
import MapToolModal from "./MapToolModal";

class Main extends React.Component {
  componentDidMount() {
    console.log("routes are mounted");
  }

  render() {
    return (
      <div>
        <Navbar />
        {/* <AddToolForm /> */}
        {/* <UserProfilePage /> */}
        <Switch>
          <Route component={About} exact path="/" /> //Needs to be landing page
          <Route component={SearchPage} exact path="/search" />
          <Route
            // component={ToolProfile}
            exact
            path="/toolProfile"
          />
          <PrivateRoute
            component={UserProfilePage}
            exact
            path="/userProfilePage"
            authed={this.props.auth}
          />
          <PrivateRoute
            // component={EditProfile}
            exact
            path="/editProfile"
            // authed={props.user}
          />
          <PrivateRoute
            // component={ListTool}
            exact
            path="/listTool"
            // authed={props.user}
          />
        </Switch>

        {/* LANDING PAGE */}
        <LandingPage />
        {/* END LANDING PAGE */}

        {/* <CreateNewUserForm /> */}
        {/* <StripeProvider apiKey="pk_test_MOtKUdvLk0HzhkWZ5l8gtg6j00j5CMoeeI">
          <div className="example">
            <h1>React Stripe Elements Example</h1>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>

        </StripeProvider>{" "} */}

        {/* <Checkout /> */}

        {/* <UserProfilePage /> */}

        {/* <AddToolForm /> */}

        {/* <MapToolModal /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    auth: state.user.auth
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
