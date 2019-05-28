import React from "react";
import { Component } from 'react';
import { connect } from "react-redux";
import './CSS/AddToolForm.css';



class AddToolForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
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

                <button type="button" name="button">Add Photo</button>
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

export default AddToolForm;