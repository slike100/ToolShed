import React from 'react';
// import { addressToLatLng } from '../utils/helperFunctions';
import { connect } from "react-redux";
import { getToolData } from "../redux/actions/toolActions";
import axios from 'axios';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTool: '',
      searchAddress: '',
      searchDistance: '',
      // searchLat: '',
      // searchLng: '',
      searchResults: [],
    };
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.addressToLatLng(this.state.searchAddress);
    // this.getAddress(searchLat, searchLng);
  }

  // getAddress = (lat, lng) => {
  //   var geocoder = new window.google.maps.Geocoder();
  //   var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
  //   geocoder.geocode({ location: latlng }, function (results, status) {
  //     if (status === "OK") {
  //       console.log(results[0]);
  //     }
  //   });
  // }

  addressToLatLng = async (location) => {
    var _this = this;
    var location = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: 'AIzaSyCc4WdJOT7P6zSJ8o1Td871UXM-3Ay3Fsw'
      }
    });

    const addressLat = location.data.results[0].geometry.location.lat;
    const addressLng = location.data.results[0].geometry.location.lng;
    const { searchTool, searchDistance } = this.state;

    let searchObj = {
      lat: addressLat,
      long: addressLng,
      name: searchTool,
      distance: searchDistance,
    }

    await this.props.getToolData(searchObj);
  }

  render() {
    return (
      <div id="sidebar">
        <form id="sidebar-search-form" onSubmit={this.handleSubmit}>
          <label className="sidebar-search-label">
            What Tool do you need to rent?
          <input className="sidebar-search-input" type="text" value={this.state.searchTool} name="searchTool" onChange={this.handleChange} />
          </label>
          <label className="sidebar-search-label">
            What is your full physical address?
          <input className="sidebar-search-input" type="text" value={this.state.searchAddress} name="searchAddress" onChange={this.handleChange} />
          </label>
          <label className="sidebar-search-label">
            How many miles are you willing to travel?
          <input className="sidebar-search-input" type="text" value={this.state.searchDistance} name="searchDistance" onChange={this.handleChange} />
          </label>
          <input className="sidebar-search-btn" type="submit" value="Search" />
        </form>
        <div id="sidebar-card-wrapper">

          <div className="sidebar-card">
            <img className="sidebar-card-img" src="https://via.placeholder.com/80" alt="" />
            <p className="sidebar-card-name">Jackhammer</p>
            <p className="sidebar-card-price">$20</p>
          </div>

          <div className="sidebar-card">
            <img className="sidebar-card-img" src="https://via.placeholder.com/80" alt="" />
            <p className="sidebar-card-name">Jackhammer</p>
            <p className="sidebar-card-price">$20</p>
          </div>

          <div className="sidebar-card">
            <img className="sidebar-card-img" src="https://via.placeholder.com/80" alt="" />
            <p className="sidebar-card-name">Jackhammer</p>
            <p className="sidebar-card-price">$20</p>
          </div>

          <div className="sidebar-card">
            <img className="sidebar-card-img" src="https://via.placeholder.com/80" alt="" />
            <p className="sidebar-card-name">Jackhammer</p>
            <p className="sidebar-card-price">$20</p>
          </div>

          <div className="sidebar-card">
            <img className="sidebar-card-img" src="https://via.placeholder.com/80" alt="" />
            <p className="sidebar-card-name">Jackhammer</p>
            <p className="sidebar-card-price">$20</p>
          </div>

          <div className="sidebar-card">
            <img className="sidebar-card-img" src="https://via.placeholder.com/80" alt="" />
            <p className="sidebar-card-name">Jackhammer</p>
            <p className="sidebar-card-price">$20</p>
          </div>

          <div className="sidebar-card">
            <img className="sidebar-card-img" src="https://via.placeholder.com/80" alt="" />
            <p className="sidebar-card-name">Jackhammer</p>
            <p className="sidebar-card-price">$20</p>
          </div>

          <div className="sidebar-card">
            <img className="sidebar-card-img" src="https://via.placeholder.com/80" alt="" />
            <p className="sidebar-card-name">Jackhammer</p>
            <p className="sidebar-card-price">$20</p>
          </div>

        </div>

      </div>
    );
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
)(Sidebar);

