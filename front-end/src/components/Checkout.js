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
      <div className="container">

        <div className="row checkoutForm">

          <div className="col s6">

            <div className="card checkoutCard">
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1557240231-9378fcdeefa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
              </div>
              <div className="card-content">
                <span className="card-title">Tool Name</span>
                <p>I am a very simple card. I am good at containing small bits of information.</p>
                <h6 >$$/DAY</h6>
              </div>
            </div>
          </div>

          <div className="col s6">


            <section className="userInfo grid2">
              <form className="borderRadius" >
                <h3>Details</h3>

                <label for="toolModel">Location</label>
                <h5>Denver, CO</h5>

                <label for="toolModel">Rental Duration</label>
                <h5>3 Days</h5>


                <label for="toolModel">Total</label>
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
            </section>

          </div>


        </div>
        {/* </div > */}

        {/* 
        <div className="col s6">

          {/* <div class="price"> */}
        {/* <h1 class="transaction">Tool Transaction</h1> */}
        {/* <h2>Circular Saw</h2> */}
        {/* <h4>Meeting Location</h4>

          <h4>Dates</h4>
          {/* <h3> 5/1/19 thru 5/3/19</h3> */}
        {/* <h4>Price per day</h4> */}
        {/* <h3>$15 per day</h3> */}
        {/* <p class="total">TOTAL</p> */}





        {/* </div> */}
        {/* </div> */}

      </div >

    )
  }

}

export default Checkout;