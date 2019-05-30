import React from "react";
import { connect } from "react-redux";
import { getToolData } from "../redux/actions/toolActions";
import Checkout from "./Checkout";
import axios from "axios";
import SearchCard from "./SearchCard";
import { API_KEY } from '../utils/firebaseConfig';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTool: "",
      searchAddress: "",
      searchDistance: "",
      checkOutModal: false,
      toolSelected: ""
    };
  }

  getToolClicked = e => {
    console.log(e.target.dataset.id);
    this.setState({
      toolSelected: e.target.dataset.id,
      checkOutModal: !this.state.checkOutModal
    });
  };

  toggle = e => {
    this.setState(prevState => ({
      checkOutModal: !this.state.checkOutModal
    }));
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.addressToLatLng(this.state.searchAddress);
    this.props.renderMap();

    // this.getAddress(searchLat, searchLng);
  };

  // getAddress = (lat, lng) => {
  //   var geocoder = new window.google.maps.Geocoder();
  //   var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
  //   geocoder.geocode({ location: latlng }, function (results, status) {
  //     if (status === "OK") {
  //       console.log(results[0]);
  //     }
  //   });
  // };

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
    const { searchTool, searchDistance } = this.state;

    let searchObj = {
      lat: addressLat,
      long: addressLng,
      name: searchTool,
      distance: searchDistance
    };

    await this.props.getToolData(searchObj);
  };

  render() {
    var modal;
    if (this.state.checkOutModal === true) {
      modal = (
        <div>
          <Checkout onToggle={this.toggle} tool={this.state.toolSelected} />
        </div>
      );
    } else {
      modal = <div />;
    }
    return (
      <div id="sidebar">
        {modal}
        <form id="sidebar-search-form" onSubmit={this.handleSubmit}>
          <label className="sidebar-search-label">
            What Tool do you need to rent?
            <input
              className="sidebar-search-input"
              type="text"
              value={this.state.searchTool}
              name="searchTool"
              onChange={this.handleChange}
            />
          </label>
          <label className="sidebar-search-label">
            What is your full physical address?
            <input
              className="sidebar-search-input"
              type="text"
              value={this.state.searchAddress}
              name="searchAddress"
              onChange={this.handleChange}
            />
          </label>
          <label className="sidebar-search-label">
            How many miles are you willing to travel?
            <input
              className="sidebar-search-input"
              type="text"
              value={this.state.searchDistance}
              name="searchDistance"
              onChange={this.handleChange}
            />
          </label>
          <input className="sidebar-search-btn" type="submit" value="Search" />
        </form>

        <SearchCard />

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
