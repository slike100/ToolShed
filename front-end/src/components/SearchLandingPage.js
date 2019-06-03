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
      // <div className="form">
      <form className="row searchForm col s12" onSubmit={this.handleSubmit}>
        <div className="row1">
          <label className="searchLabel" for="tool-name">What:</label>
          <div className="input-field col">
            {/* <i className="material-icons prefix">account_circle</i> */}
            <div className="input-field">

              <input id="tool-name" name="searchLandingTool" type="text" className="validate" onChange={this.handleChange} value={this.state.searchLandingTool} />
              <label for="tool-name">Portable Sand Blaster</label>
            </div>
          </div>
          <label className="searchLabel" for="tool-name">Where:</label>

          <div className="input-field col">
            {/* <i className="material-icons prefix">email</i> */}
            <div className="input-field">
              <input id="address" name="searchLandingAddress" type="text" className="validate" onChange={this.handleChange} value={this.state.searchLandingAddress} />
              <label for="address">Denver, CO</label>
            </div>
          </div>
          <label className="searchLabel" for="tool-name">How Far:</label>

          <div className="input-field col">
            {/* <i className="material-icons prefix">email</i> */}
            <div className="input-field">
              <input id="distance" name="searchLandingDistance" type="text" className="validate" onChange={this.handleChange} value={this.state.searchLandingDistance} />
              <label for="distance">3O mi</label>
            </div>
          </div>
          <div className="searchBtn col">
            <button class="btn-small waves-light">Search</button>
            {/* <input className="sidebar-search-btn" type="submit" value="Search" /> */}
          </div>

        </div>
      </form>
      // </div>
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

