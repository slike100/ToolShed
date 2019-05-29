import React from "react";
import { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { connect } from "react-redux"; // import connect from Redux

import './CSS/stripe.css';

import {
  payStripe,
  getRecordData,
  updateUser
} from "../redux/actions/userActions";
import { editTool } from "../redux/actions/toolActions";
import axios from "axios";


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
  }


  submit = async e => {
    let { token } = await this.props.stripe.createToken({
      name: this.props.user.displayName
    });
    var user = await axios.post(
      `https://us-central1-toolshed-1dd98.cloudfunctions.net/stripe/createUser/`,
      { source: token, email: this.props.user.email }
    );
    console.log(user);
    var updated = await this.props.updateUser({
      uid: this.props.user.uid,
      stripeToken: user.data.id
    });
    console.log(updated);
  };
  

  render() {
    return (
      <div className="checkout">

        <CardElement style={{
          base: {
            fontSize: '20px',
          }
        }} />
        <button className="submitBtn" onClick={this.submit}>BOOK NOW</button>

      </div>
    );
  }
}

const Stripe = injectStripe(CheckoutForm);

const mapDispatchToProps = {
  payStripe,
  getRecordData,
  editTool,
  updateUser
};

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stripe);
