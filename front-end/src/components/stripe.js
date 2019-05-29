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


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
  }


  submit = async e => {
    let { token } = await this.props.stripe.createToken({
      name: this.props.user.userName
    });
    console.log(token);
    this.props.updateUser({
      uid: this.props.user.uid,
      stripeToken: token.id
    });
  };

  //this function simulataneously, gets the rental record, updates it to have the check in time, and then charges the stripe endpoint with the correct amount, as well as updates the tool in the database to say rented false.
  // checkIn = async e => {
  //   e.preventDefault();
  //   var obj = { isRented: false };
  //   await this.props.getRecordData("r2gkuhkHZGhWk2kNywKl");
  //   await this.props.editTool("r2gkuhkHZGhWk2kNywKl", obj);
  // };

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
