import React from "react";
import { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { connect } from "react-redux"; // import connect from Redux

import "./CSS/stripe.css";

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
    this.createRecord(e);
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

  createRecord = async e => {
    var d = new Date();
    var n = d.getTime();
    // dueDate = n + timeGivenFromCheckout
    for (let i = 0; i < this.props.tools.length; i++) {
      if (this.props.tools[i].id === e.target.dataset.id) {
        var recordObj = {
          ownerId: this.props.tools[i].uid,
          rentalUserId: this.props.user.uid,
          dueDate: 1, //placeholder, will be dueDate variable above
          pricePerDay: this.props.tools[i].priceRatePerDay,
          recordIds: this.props.user.recordIds
        };
        await axios
          .post(
            `https://us-central1-toolshed-1dd98.cloudfunctions.net/toolRentalRecord/newRentalRecord/`,
            recordObj
          )
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
    }
  };

  render() {
    return (
      <div className="checkout">
        <CardElement
          style={{
            base: {
              fontSize: "20px"
            }
          }}
        />
        <button className="submitBtn" onClick={this.submit}>
          BOOK NOW
        </button>
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
    user: state.user.user,
    tools: state.tool.toolsSearched
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stripe);
