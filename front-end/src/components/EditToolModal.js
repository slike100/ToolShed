import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import "./CSS/AddToolForm.css";
import { editTool, getToolsOwned } from "../redux/actions/toolActions";
import "materialize-css/dist/css/materialize.min.css";
const firebase = require("firebase");

class EditToolModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  previewFile = () => {
    // var preview = document.getElementById("toolImage");
    // var file = document.querySelector("input[type=file]").files[0];
    // var reader = new FileReader();
    // reader.onloadend = function() {
    //   preview.src = reader.result;
    // };
    // if (file) {
    //   reader.readAsDataURL(file);
    // } else {
    //   preview.src = "";
    // }
  };

  sendAction = async () => {
    console.log(this.state.photoURL);
    let editedToolObj = {
      name: document.getElementById("toolType").value,
      description: document.getElementById("description").value,
      isRented: this.props.tools.isRented,
      uid: this.props.user.uid,
      photo: this.state.photoURL,
      priceRatePerDay: parseInt(document.getElementById("rentalPrice").value),
      rentalDurationInDays: this.props.tools.rentalDurationInDays,
      lat: this.props.user.lat,
      long: this.props.user.long,
      toolsOwned: this.props.user.toolsOwned
    };
    await this.props.editTool(editedToolObj);
    await this.props.getToolsOwned(this.props.user.uid);
  };

  render() {
    return (
      <div className="listToolPage">
        <div className="grid">
          <section className="photoContainer grid1">
            <div className="photoBackground borderRadius" id="photo-section">
              <div className="photo">
                <img className="photo" id="toolImage" />
              </div>
              <div className="button">
                <input
                  type="file"
                  name="file"
                  id="fileButton"
                  class="inputFile"
                  onChange={this.previewFile}
                />
              </div>
            </div>
          </section>

          <div className="toolInfo grid2">
            <form className="borderRadius" id="toolInfo-section">
              <h3>Tool Info</h3>
              <label for="toolType">Tool Type</label>
              <input
                type="text"
                id="toolType"
                name="toolType"
                placeholder="ex: Circular Saw.."
              />
              <label for="description">Description</label>
              <textarea
                className="description"
                name="description"
                id="description"
                placeholder="ex: 7-1/4&#8243; blade, cordless saw with 1 extra battery and charging station.."
              />
            </form>
            <div className="formButtons">
              <button
                id="close-button"
                className="-action modal-close waves-effect waves-green btn-flat"
              >
                Cancel
              </button>

              <input
                className="button"
                type="submit"
                value="Save"
                onClick={this.uploadPhoto}
              />
            </div>
          </div>

          <section className="tgrid3" id="rental-section">
            <form className="borderRadius">
              <h3>Rental Price</h3>
              <label for="rentalPrice">Price per Day</label>
              <input
                type="text"
                id="rentalPrice"
                name="rentalPrice"
                placeholder="ex: 7.00"
              />
            </form>
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    uid: state.user.uid,
    tools: state.tool.tool
  };
}

const mapDispatchToProps = {
  editTool,
  getToolsOwned
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditToolModal);
