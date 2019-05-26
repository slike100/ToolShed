import React from "react";
import { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { connect } from "react-redux"; // import connect from Redux
import { payStripe, getRecordData } from "../redux/actions/userActions";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
  }

  submit = async e => {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    console.log(token);
    this.props.payStripe(token.id);
  };

  yo = async e => {
    e.preventDefault();
    this.props.getRecordData(555);
  };

  render() {
    return (
      <div className="checkout">
        <CardElement />
        <button onClick={this.submit}>Send</button>
        <button onClick={this.yo}>2222</button>
      </div>
    );
  }
}

const Stripe = injectStripe(CheckoutForm);

const mapDispatchToProps = {
  payStripe,
  getRecordData
};

// function mapStateToProps(state){
//   return {
//     stripeToken: state.stripeToken,
//   }
// }

export default connect(
  null,
  mapDispatchToProps
)(Stripe);
