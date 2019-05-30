import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import "./CSS/AddToolForm.css";
import { editTool, getToolsOwned } from "../redux/actions/toolActions";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import options from "materialize-css/dist/js/materialize.min.js";
import { stat } from "fs";
const firebase = require("firebase");

class EditToolModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      photoURL: ""
    };
  }

  componentDidMount() {
    console.log(this.props.user);
    this.setState({
      photoURL: this.props.image
    });
    const elems = document.querySelectorAll(".modal");
    const instances = M.Modal.init(elems, options);
  }

  previewFile = e => {
    const _this = this;
    var preview = document.getElementById("toolImage");
    console.log(preview);
    console.log(preview.src);
    var file = e.target.files[0];
    console.log(file);
    var reader = new FileReader();
    reader.onloadend = function() {
      preview.src = reader.result;
      var image = reader.result;
      _this.setState({
        photoURL: image
      });
      _this.uploadPhoto();
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  };

  uploadPhoto = async () => {
    const _this = this;
    var file = document.getElementById("chooseFileButton").files[0];
    console.log(file);
    console.log(file.name);
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef
      .child(this.props.uid + "/" + file.name)
      .put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot) {
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function(error) {
        switch (error.code) {
          case "storage/unauthorized":
            console.log(`You do not have permission to upload this photo.`);
            break;

          case "storage/canceled":
            console.log(`Your photo upload has been cancelled.`);
            break;

          case "storage/unknown":
            console.log(
              `An unknown error occurred when trying to upload the photo.`
            );
            break;
        }
      },
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          _this.setState({
            photoURL: downloadURL
          });
          //   _this.sendAction();
        });
      }
    );
  };

  sendAction = async () => {
    let editedToolObj = {
      name: document.getElementById("editToolType").value,
      description: document.getElementById("editDescription").value,
      isRented: this.props.isRented,
      uid: this.props.user.uid,
      photo: this.state.photoURL,
      priceRatePerDay: parseInt(
        document.getElementById("editRentalPrice").value
      ),
      rentalDurationInDays: this.props.tools.rentalDurationInDays,
      lat: this.props.user.lat,
      long: this.props.user.long,
      toolsOwned: this.props.user.toolsOwned
    };

    await this.props.editTool(this.props.toolId, editedToolObj);
    await this.props.getToolsOwned(this.props.uid);
  };

  render() {
    return (
      <div id="editToolModal" class="modal">
        <div class="modal-content" />
        <div className="listToolPage">
          <div className="grid">
            <section className="photoContainer grid1">
              <div className="photoBackground borderRadius" id="photo-section">
                <div className="photo">
                  <img
                    className="photo"
                    id="toolImage"
                    src={this.state.photoURL}
                  />
                </div>
                <div className="button">
                  <input
                    type="file"
                    name="file"
                    id="chooseFileButton"
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
                  defaultValue={this.props.toolName}
                  type="text"
                  id="editToolType"
                  name="toolType"
                  required={true}
                  type="text"
                />
                <label for="description">Description</label>
                <input
                  className="description"
                  name="description"
                  id="editDescription"
                  defaultValue={this.props.description}
                  required={true}
                  type="text"
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
                  className="button save  modal-close"
                  type="submit"
                  value="Save"
                  onClick={this.sendAction}
                  required={true}
                  type="text"
                />
              </div>
            </div>

            <section className="tgrid3" id="rental-section">
              <form className="borderRadius">
                <h3>Rental Price</h3>
                <label for="rentalPrice">Price per Day</label>
                <input
                  type="text"
                  id="editRentalPrice"
                  name="rentalPrice"
                  defaultValue={this.props.rentalPrice}
                  required={true}
                  type="text"
                />
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    uid: state.user.user.uid,
    tools: state.tool.toolsOwned
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
