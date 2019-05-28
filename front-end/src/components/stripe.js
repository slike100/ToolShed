import React from "react";
import { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from "react-redux"; // import connect from Redux
import { payStripe } from '../redux/actions/userActions';
import './CSS/stripe.css';



class CheckoutForm extends Component {
  constructor(props) {
    super(props);
  }

  submit = async (e) => {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    console.log(token);
    this.props.payStripe(token.id);
  }

  render() {
    return (
      <div className="checkout">

        <CardElement style={{
          base: {
            fontSize: '20px',
            border: '2px solid red'
          }
        }} />
        <button className="submitBtn" onClick={this.submit}>BOOK NOW</button>
      </div>
    );
  }
}

const Stripe = injectStripe(CheckoutForm);

const mapDispatchToProps = {
  payStripe
}

// function mapStateToProps(state){
//   return {
//     stripeToken: state.stripeToken,
//   }
// }

export default connect(
  null,
  mapDispatchToProps,
)(Stripe);