import React from "react";
import { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from "react-redux"; // import connect from Redux
import { payStripe } from '../redux/actions/userActions';


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   stripeToken: ''
    // }
  }

  submit = async (e) => {
    let { token } = await this.props.stripe.createToken({name: "Name"});
    console.log(token);
    // this.setState({
    //   stripeToken: token.id,
    // })
    this.props.payStripe(token.id);
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