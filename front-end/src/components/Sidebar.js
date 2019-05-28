import React, { Component } from 'react';
import { TextInput } from "react-materialize";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lng: '',
    };
  }

  handleSubmit = (e) => {
    alert('The value is: ' + this.input.value);
    e.preventDefault();
  }

  render() {
    return (
      <div id="sidebar">
        <form id="search-form" onSubmit={this.handleSubmit}>
          <label>
            Name:
          <input type="text" ref={(input) => this.input = input} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Sidebar;

