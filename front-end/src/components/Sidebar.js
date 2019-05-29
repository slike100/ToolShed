import React from 'react';
import { addressToLatLng } from '../utils/helperFunctions';
import axios from "axios";
import { toolBaseUrl } from "../utils/globalConstants";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTool: '',
      searchAddress: '',
      searchDistance: '',
      searchLat: '',
      searchLng: '',
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

  handleSubmit = (e) => {
    e.preventDefault();
    addressToLatLng(this.state.searchAddress, this); //Sloppy as hell

    axios.get(`${toolBaseUrl}searchTools/?lat=${this.state.searchLat}&long=${this.state.searchLng}&name=${this.state.searchTool}&distance=${this.state.searchDistance}`)
      .then(res => {
        if (res.status === 200 && res.data) {
          console.log(`SUCCESS! Returned Search Results! `, res.data)

          this.setState({
            searchResults: res.data,
          })
        }
      })
      .catch(err => {
        console.log("There was an error searching for tools ", err);
      })
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

export default Sidebar;

