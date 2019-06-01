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

  // toggle = e => {
  //   this.setState(prevState => ({
  //     checkOutModal: !this.state.checkOutModal
  //   }));
  // };

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
          <h5 className="sidebar-search-form-h5">Search for Tools</h5>
          <div id="sidebar-search-form-inner">
            <div className="input-field" id="margin-fix">
              <label htmlFor="search-tool">What tool do you want to rent?</label>
              <input
                type="text"
                id="search-form-tool"
                className="sidebar-search-form-center-text"
                value={this.state.searchTool}
                name="searchTool"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="search-form-address">What is your City and State?</label>
              <input
                type="text"
                id="search-form-address"
                className="sidebar-search-form-center-text"
                value={this.state.searchAddress}
                name="searchAddress"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="search-form-distance">How many miles will you travel?</label>
              <input
                type="text"
                id="search-form-distance"
                className="sidebar-search-form-center-text"
                value={this.state.searchDistance}
                name="searchDistance"
                onChange={this.handleChange}
                pattern="[0-9]*"
                maxLength="3"
              />
            </div>
            <div className="sidebar-search-form-button">
              <input
                className="sidebar-search-form-submit"
                type="submit"
                value="Search"
              />
            </div>
          </div>
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
