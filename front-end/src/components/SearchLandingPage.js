import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { getToolData } from "../redux/actions/toolActions";
import axios from "axios";
import { API_KEY } from '../utils/firebaseConfig';

import "../components/CSS/Jumbotron.css";

class SearchLandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchLandingTool: "",
      searchLandingAddress: "",
      searchLandingDistance: "",
    };
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.addressToLatLng(this.state.searchLandingAddress);
  };

  addressToLatLng = async location => {
    const getResult = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: location,
          key: API_KEY,
        }
      }
    );
    const addressLat = getResult.data.results[0].geometry.location.lat;
    const addressLng = getResult.data.results[0].geometry.location.lng;
    const { searchLandingTool, searchLandingDistance } = this.state;

    let searchObj = {
      lat: addressLat,
      long: addressLng,
      name: searchLandingTool,
      distance: searchLandingDistance
    };

    await this.props.getToolData(searchObj);
    this.props.history.push('/search');
  };

  render() {
    return (
      <div class="container">
        <form class="col s12 search-landing-page-form-wrapper" onSubmit={this.handleSubmit}>

          <p class="search-landing-page-p">What?</p>
          <div class="input-field col s3 sidebar-search-form-input-field">
            <input
              id="tool-name"
              type="text"
              name="searchLandingTool"
              onChange={this.handleChange}
              value={this.state.searchLandingTool}
            />
            <label for="tool-name">Jackhammer</label>
          </div>

          <p>Where?</p>
          <div class="input-field col s3 sidebar-search-form-input-field">
            <input
              id="address"
              type="text"
              name="searchLandingAddress"
              onChange={this.handleChange}
              value={this.state.searchLandingAddress}
            />
            <label for="address">Denver, CO</label>
          </div>

          <p>How far?</p>
          <div class="input-field col s3 sidebar-search-form-input-field">
            <input
              id="distance"
              type="text"
              name="searchLandingDistance"
              onChange={this.handleChange}
              value={this.state.searchLandingDistance}
            />
            <label for="distance">40 miles</label>
          </div>

          <div class="input-field col s3 sidebar-search-form-input-field">
            <input
              className="search-landing-page-form-submit ts-green-button"
              type="submit"
              value="Search Tools"
            />
          </div>
        </form>
      </div>


    )
  }


}
const mapDispatchToProps = {
  getToolData
};

function mapStateToProps(state) {
  return {
    tool: state.tool
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchLandingPage));

