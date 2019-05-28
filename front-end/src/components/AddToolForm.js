import React from "react";
import { Component } from 'react';
import { connect } from "react-redux";
import './CSS/AddToolForm.css';
import{ createTool } from "../redux/actions/toolActions";
import store from "../redux/store";



class AddToolForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }



  uploadPhoto = () => {
    const s = store.getState()
    console.log(s.uid)
    var file = document.getElementById('fileButton').files[0];
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child(s.uid + file.name).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
      function(snapshot){
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        switch (error.code) {
          case 'storage/unauthorized':
            console.log(`You do not have permission to upload this photo.`)
            break;

          case 'storage/canceled':
            console.log(`Your photo upload has been cancelled.`)
            break;

          case 'storage/unknown':
            console.log(`An unknown error occurred when trying to upload the photo.`)
            break;
        }
        }, function() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            return(downloadURL)
          });
        }) ; 
  }

  //need to add an async function that calls the upload photo function and then scrapes over the form fields to pick up values from the form and add them to a tool object that will be passed to this.props.createTool
  //toolObj = {

  }

  render() {
    return (
      <div className="listToolPage">

        <div className="grid">

          <section className="photoContainer grid1">
            <div className="photoBackground borderRadius">
              <div className="photo">
                <i className="far fa-images fa-4x"></i>
              </div>
              <div className="button">
                {/* <button type="button" name="button">Add Photos</button> */}
                <input type="file" value="upload" id="fileButton"/> 
              </div>
            </div>
          </section>

          <div className="toolInfo grid2">
            <form className="borderRadius">
              <h3>Tool Info</h3>
              <label for="toolType">Tool Type</label>
              <input type="text" id="toolType" name="toolType" placeholder="ex: Circular Saw.." />
              {/* 
              <label for="toolBrand">Tool Brand</label>
              <input type="text" id="toolBrand" name="toolBrand" placeholder="ex: DeWalt.." /> */}

              <label for="description">Description</label>
              <textarea className="description" name="description"
                placeholder="ex: 7-1/4&#8243; blade, cordless saw with 1 extra battery and charging station.."></textarea>
            </form>
          </div>

          <section className="toolInfo grid3">
            <form className="borderRadius">
              <h3>Rental Price</h3>
              <label for="rentalPrice">Price per Day</label>
              <input type="text" id="rentalPrice" name="rentalPrice" placeholder="ex: $7.00" />
            </form>
          </section>

          <section className="formButtons grid4">
            <input className="button" type="submit" value="Save" />
            <input className="button" type="cancel" value="Cancel" />
          </section>

        </div>

      </div>
    )
  }


}

function mapStateToProps(state) {
  return {
   
  };
}

const mapDispatchToProps = {
  createTools
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToolForm);