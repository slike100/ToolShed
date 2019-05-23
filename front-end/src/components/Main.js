import React from "react";
import { connect } from "react-redux";
import CheckoutForm from "./stripe";
import {Elements, StripeProvider} from 'react-stripe-elements';

import Navbar from "./Navbar";

// import actions here if needed

class Main extends React.Component {

  render(){
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
    
      <div>
        <Navbar />
      </div>
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
