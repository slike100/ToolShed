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
        <div class="modal-content" />
        <div className="checkoutForm">
          <form className="borderRadius">
            <h3>Rental Details</h3>

            <label for="toolModel">Tool Description:</label>
            <h5>{this.props.fullTool.description}</h5>

            <label for="toolModel">Rental Duration In Days:</label>
            <input placeholder="Please enter full day amount here!" />

            <label for="toolModel">Total Per Day:</label>
            <h5>$ {this.props.fullTool.priceRatePerDay}</h5>

            <div className="">
              <StripeProvider apiKey="pk_test_MOtKUdvLk0HzhkWZ5l8gtg6j00j5CMoeeI">
                <div className="example">
                  <Elements>
                    <CheckoutForm tool={this.props.fullTool} />
                  </Elements>
                </div>
              </StripeProvider>
            </div>
          </form>
          <button
            id="close-button"
            className="-action modal-close waves-effect waves-green btn-flat"
          >
            close
          </button>
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
