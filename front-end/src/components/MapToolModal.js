import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import { connect } from "react-redux";

import './CSS/MapToolModal.css';

class MapToolModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }




  render() {
    return (

      <div className="card checkoutCard">
        <div className="card-image">
          <img src="https://images.unsplash.com/photo-1557240231-9378fcdeefa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
        </div>
        <div className="card-content">
          <span className="card-title">Tool Name</span>
          <p>I am a very simple card. I am good at containing small bits of information.</p>
        </div>
        <div className="card-action">
          <h6 >$$/DAY</h6>
          <button
            className="btn-small waves-effect waves-light"
            type="submit"
            name="action"
          >
            RENT ME!
            </button>
        </div>
      </div>

    )
  }

}

export default MapToolModal;


