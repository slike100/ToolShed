import React from "react";
import {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stripeToken: ''
    }
  }

  submit = async (e) => {
    let { token } = await this.props.stripe.createToken({name: "Name"});
    console.log(token);
    this.setState({
      stripeToken: token.id,
    })
  }

  render() {
    return (
      <div className="checkout">
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);