import "materialize-css/dist/css/materialize.min.css";
import options from "materialize-css/dist/js/materialize.min.js";
import React from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import { Link } from "react-router-dom";

import "./CSS/ConfirmationModal.css";
import image from '../assets/img/ToolShed-Loading-Spinner.gif'

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
    // this.onUnload = this.onUnload.bind(this);

    this.state = {
      tool: this.props.tool
    };
  }

  componentDidMount() {
    console.log("inside modal");
    const elems = document.querySelectorAll(".modal");
    const instances = M.Modal.init(elems, options);
  }

  render() {
    console.log("conf props", this.props);

    const totalPrice = this.props.tool.priceRatePerDay * this.props.days;

    console.log(totalPrice);
    var spinner;
    if(!this.props.dueDate || !this.props.ownerName || !this.props.ownerEmail){
      spinner = (<div><img src={image}/></div>)
    } else {
      spinner = (<div className="card-stacked">
      <div className="card-content">
        <h3>Hooray!</h3>
        <h6 className="confFont">You just rented a very special tool!</h6>
        <h6 className="confFont">
          Please contact the owner below to set up pick-up arrangements.
        </h6>
        <h5 className="confFont">Total Price: ${totalPrice}</h5>
        <h5 className="confFont">Due Date: {this.props.dueDate}</h5>
        <h5 className="confFont">Owner: {this.props.ownerName}</h5>
        <h5 className="confFont">Owner Email: {this.props.ownerEmail}</h5>
        <Link to="/userProfilePage">
          <button className="ts-orange-button confirmation-modal-close-button">
            Close
          </button>
        </Link>
      </div>
    </div>)
    }
  

    return (
      <div id="confirmationToolModal" class="modal confirmModal">
        <div className="card horizontal confirm z-depth-4">
        {spinner}
          {/* <div className="card-image">
            <img className="toolImage" src={this.props.tool.photo} />
          </div> */}
          {/* <div className="card-stacked">
            <div className="card-content">
              <h3>Hooray!</h3>
              <h6 className="confFont">You just rented a very special tool!</h6>
              <h6 className="confFont">
                Please contact the owner below to set up pick-up arrangements.
              </h6>
              <h5 className="confFont">Total Price: ${totalPrice}</h5>
              <h5 className="confFont">Due Date: {this.props.dueDate}</h5>
              <h5 className="confFont">Owner: {this.props.ownerName}</h5>
              <h5 className="confFont">Owner Email: {this.props.ownerEmail}</h5>
              <Link to="/userProfilePage">
                <button className="ts-orange-button confirmation-modal-close-button">
                  Close
                </button>
              </Link>
            </div>
          </div> */}
        </div>
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
