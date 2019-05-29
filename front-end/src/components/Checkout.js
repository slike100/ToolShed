import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import { connect } from "react-redux";
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from "./stripe";

import './CSS/Checkout.css';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }




  render() {
    return (

      <div className="checkoutForm">

        <form className="borderRadius" >
          <h3>Rental Details</h3>

          <label for="toolModel">Pick-up Location:</label>
          <h5>Denver, CO</h5>

          <label for="toolModel">Rental Duration:</label>
          <h5>3 Days</h5>


          <label for="toolModel">Total:</label>
          <h5>$45</h5>


          <div className="">
            <StripeProvider apiKey="pk_test_MOtKUdvLk0HzhkWZ5l8gtg6j00j5CMoeeI">
              <div className="example">
                <Elements>
                  <CheckoutForm />
                </Elements>
              </div>
            </StripeProvider>
          </div>

        </form>
      </div>




    )
  }

}

export default Checkout;



{/* <div className="card checkoutCard">
<div className="card-image">
  <img src="https://images.unsplash.com/photo-1557240231-9378fcdeefa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
</div>
<div className="card-content">
  <span className="card-title">Tool Name</span>
  <p>I am a very simple card. I am good at containing small bits of information.</p>
  <h6 >$$/DAY</h6>
</div>
<div className="card-action">
  <button
    className="btn-small waves-effect waves-light"
    type="submit"
    name="action"
  >
    Edit Tool
</button>

</div>
</div> */}