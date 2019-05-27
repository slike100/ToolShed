import React from "react";
import { connect } from "react-redux";
import CheckoutForm from "./stripe";
import { Elements, StripeProvider } from "react-stripe-elements";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Navbar from "./Navbar";

import AddToolForm from "./AddToolForm";
import CreateNewUserForm from "./CreateNewUserForm";

class Main extends React.Component {
  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_MOtKUdvLk0HzhkWZ5l8gtg6j00j5CMoeeI">
          <div className="example">
            <h1>React Stripe Elements Example</h1>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>

        {/* <AddToolForm /> */}
      </div>
    );
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
