import React from 'react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTool: '',
      searchAddress: '',
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
    alert(this.state.searchTool + this.state.searchAddress);
  }

  render() {
    return (
      <form id="sidebar" onSubmit={this.handleSubmit}>
        <label class="sidebar-search-label">
          What Tool do you need?
          <input class="sidebar-search-input" type="text" value={this.state.searchTool} name="searchTool" onChange={this.handleChange} />
        </label>
        <label class="sidebar-search-label">
          What is your full physical address?
          <input class="sidebar-search-input" type="text" value={this.state.searchAddress} name="searchAddress" onChange={this.handleChange} />
        </label>
        <input class="sidebar-search-btn" type="submit" value="Search" />
      </form>
    );
  }
}

export default Sidebar;

