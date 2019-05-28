import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import "./CSS/AddToolForm.css";
import { createTool } from "../redux/actions/toolActions";
import store from "../redux/store.js";
const firebase = require("firebase");

class AddToolForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      photoURL: ""
    };
  }

  previewFile = () => {
    var preview = document.getElementById("toolImage");
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  };

  uploadPhoto = async () => {
    const _this = this;
    var file = document.getElementById("fileButton").files[0];
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child("/images" + file.name).put(file);

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

          _this.sendAction();
        });
      }
    );
  };

  sendAction = () => {
    console.log(this.state.photoURL);
    let newToolObj = {
      name: document.getElementById("toolType").value,
      description: document.getElementById("description").value,
      isRented: false,
      // uid: this.props.user.uid,
      uid: "RRaBwQxL5QQ2uFPDHp3fUdThoYD2",
      photo: this.state.photoURL,
      priceRatePerDay: parseInt(document.getElementById("rentalPrice").value),
      rentalDurationInDays: 0,
      lat: this.props.user.lat,
      long: this.props.user.long,
      toolsOwned: ["ricxT0EfvoCDuzBF7YyE", "bTBfLNpVlxt9XmYQnPlK"]
    };
    this.props.createTool(newToolObj);
  };

  render() {
    return (
      <div className="listToolPage">
        <div className="grid">
          <section className="photoContainer grid1">
            <div className="photoBackground borderRadius">
              <div className="photo">
                <img className="photo" id="toolImage" />
              </div>
              <div className="button">
                <input
                  type="file"
                  id="fileButton"
                  onChange={this.previewFile}
                />
              </div>
            </div>
          </section>

          <div className="toolInfo grid2">
            <form className="borderRadius">
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
          </div>

          <section className="toolInfo grid3">
            <form className="borderRadius">
              <h3>Rental Price</h3>
              <label for="rentalPrice">Price per Day</label>
              <input
                type="text"
                id="rentalPrice"
                name="rentalPrice"
                placeholder="ex: $7.00"
              />
            </form>
          </section>

          <section className="formButtons grid4">
            <input
              className="button"
              type="submit"
              value="Save"
              onClick={this.uploadPhoto}
            />
            <input className="button" type="cancel" value="Cancel" />
          </section>
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

const mapDispatchToProps = {
  createTool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToolForm);
