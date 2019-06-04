import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import options from "materialize-css/dist/js/materialize.min.js";
import React from "react";
import { connect } from "react-redux";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./stripe";

import "./CSS/Checkout.css";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullTool: ""
    };
  }

  componentDidMount() {
    const elems = document.querySelectorAll(".modal");
    const instances = M.Modal.init(elems, options);
  }

  render() {
    console.log(this.props);
    return (
      <div id="checkoutModal" class="modal">
        <div className="modal-content" />
        <div className="checkoutForm">
          {/* <form className="borderRadius"> */}
          <h3>Rental Details</h3>

          <label className="checkOutLabel" for="toolModel">
            Tool Description:
          </label>
          <h5>{this.props.fullTool.description}</h5>
          <label className="checkOutLabel" for="toolModel">
            Price Per Day:
            <label className="checkOutLabel">
              ${this.props.fullTool.priceRatePerDay}
            </label>
          </label>
          <br />
          <label className="checkOutLabel" for="toolModel">
            Rental Duration In Days:
          </label>

          <input className="daysInput" placeholder="ex: 3" />
          <br />
          <label className="checkOutLabel" for="toolModel">
            Credit Card Info:
          </label>

          <div className="stripe-credit-card-border ">
            <StripeProvider apiKey="pk_test_MOtKUdvLk0HzhkWZ5l8gtg6j00j5CMoeeI">
              <div className="example">
                <Elements>
                  <CheckoutForm tool={this.props.fullTool} />
                </Elements>
              </div>
            </StripeProvider>
          </div>
          {/* </form> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    toolsSearched: state.tool.toolsSearched
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
