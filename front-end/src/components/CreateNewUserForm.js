import React from "react";
import { Component } from 'react';
import { connect } from "react-redux";
import './CSS/CreateNewUserForm.css';



class CreateNewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  render() {
    return (
      <div className="newUserForm">

        <div className="grid">

          <section className="photoContainer grid1">
            <div className="photoBackground borderRadius">
              <div className="photo">
                <i className="far fa-images fa-4x"></i>
              </div>
              <div className="button">
                <button type="button" name="button">Change Photo</button>
              </div>
            </div>
          </section>

          <section className="userInfo grid2">
            <form className="borderRadius" >
              <h3>User Info</h3>
              <label for="toolType">First Name</label>
              <input type="text" id="firstName" name="firstName" placeholder="" />

              <label for="toolBrand">Last Name</label>
              <input type="text" id="lastName" name="lastName" placeholder="" />

              <label for="toolModel">Email</label>
              <input type="text" id="email" name="email" placeholder="" />

              <label for="toolModel">Password</label>
              <input type="text" id="newPassword" name="newPassword" placeholder="" />

              <label for="toolModel">Confirm Password</label>
              <input type="text" id="confirmNewPassword" name="confirmNewPassword" placeholder="" />

              <label for="toolModel">Address</label>
              <input type="text" id="address" name="address" placeholder="" />


            </form>
          </section>

          <section className="formButtons grid4">
            <input className="button" type="submit" value="Save" />
            <input className="button" type="cancel" value="Cancel" />
          </section>


        </div>
      </div >
    )
  }


}

export default CreateNewUserForm;