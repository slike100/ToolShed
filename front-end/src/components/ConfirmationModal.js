import "materialize-css/dist/css/materialize.min.css";
import options from "materialize-css/dist/js/materialize.min.js";
import React from "react";
import { connect } from "react-redux";

import "./CSS/ConfirmationModal.css";

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      < div className="card horizontal confirm z-depth-4" >
        <div className="card-image">
          <img className="toolImage" src="https://images.unsplash.com/photo-1501623364001-70bfe454b916?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <h3>Hooray!</h3>
            <h6>You just rented a very special tool!</h6>
            <h6>Please contact the onwer below to set up pick-up arrangements.</h6>
            <h5>Total Price: $</h5>
            <h5>Due Date: </h5>
          </div>
          <div className="card-action">
            <h5>Owner Email: </h5>
          </div>

        </div >
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationModal);