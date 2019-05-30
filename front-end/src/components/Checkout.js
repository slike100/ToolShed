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

  getFullTool = () => {
    var tool;
    for (let i = 0; i < this.props.toolsSearched.length; i++) {
      if (this.props.tool === this.props.toolsSearched[i].toolId) {
        var tool = this.props.toolsSearched[i];
      }
    }
    this.setState({
      fullTool: tool
    });
  };

  componentDidMount() {
    this.getFullTool();
  }

  render() {
    return (
      <div className="checkoutForm">
        <form className="borderRadius">
          <h3>Rental Details</h3>

          <label for="toolModel">Pick-up Location:</label>
          <h5>Denver, CO</h5>

          <label for="toolModel">Rental Duration In Days:</label>
          <input placeholder="Please enter full day amount here!" />

          <label for="toolModel">Total Per Day:</label>
          <h5>$ {this.state.fullTool.priceRatePerDay}</h5>

          <div className="">
            <StripeProvider apiKey="pk_test_MOtKUdvLk0HzhkWZ5l8gtg6j00j5CMoeeI">
              <div className="example">
                <Elements>
                  <CheckoutForm tool={this.state.fullTool} />
                </Elements>
              </div>
            </StripeProvider>
            <button id="close-button" onClick={this.props.onToggle}>
              close
            </button>
          </div>
        </form>

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
