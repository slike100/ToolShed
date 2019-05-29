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
  constructor(props) {
    super(props);
  }
  //   this.state = {
  //     checkOutModal: false
  //   };
  // }

  // toggle = () => {
  //   this.setState(prevState => ({
  //     checkOutModal: !prevState.checkOutModal
  //   }));
  // };

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route component={LandingPage} exact path="/" />
          <Route component={SearchPage} exact path="/search" />
          <PrivateRoute
            component={UserProfilePage}
            exact
            path="/userProfilePage"
            authed={this.props.auth}
          />
        </Switch>
        {/* <CreateNewUserForm /> */}

        {/* <StripeProvider apiKey="pk_test_MOtKUdvLk0HzhkWZ5l8gtg6j00j5CMoeeI">
          <div className="example">
            <h1>React Stripe Elements Example</h1>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider> */}

        {/* <AddToolForm /> */}
      </div>
    );
  }

  // return (
  //   <div>
  //     <Navbar />
  //     <button onClick={this.openModal}>checkout</button>

  //     <Switch>
  //       <Route component={LandingPage} exact path="/" />
  //       <Route component={SearchPage} exact path="/search" />
  //       <PrivateRoute
  //         component={UserProfilePage}
  //         exact
  //         path="/userProfilePage"
  //         authed={this.props.auth}
  //       />
  //     </Switch>
  //     <Checkout />
  //   </div>
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
