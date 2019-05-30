import React, { Component } from 'react';
import { connect } from "react-redux";

import "../components/CSS/Jumbotron.css";

class SearchLandingPage extends Component {
   constructor(props){
       super(props);

       this.state = {
        searchTool: "",
        searchAddress: "",
        distance: "",
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
    console.log(this.state);
  };

   render(){
       return(
            <div className="form">
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s4">
                            {/* <i className="material-icons prefix">account_circle</i> */}
                            <input id="tool-name" name="searchTool" type="text" className="validate" onChange={this.handleChange} />
                            <label for="tool-name">Tools Name</label>
                        </div>
                        <div className="input-field col s4">
                            {/* <i className="material-icons prefix">email</i> */}
                            <input id="address" name="searchAddress" type="text" className="validate" onChange={this.handleChange} />
                            <label for="address">Address</label>
                        </div>
                        <div className="input-field col s2">
                            {/* <i className="material-icons prefix">email</i> */}
                            <input id="distance" name="distance" type="text" className="validate" onChange={this.handleChange} />
                            <label for="distance">Distance</label>
                        </div>
                        <div className="col s2">
                        <input className="sidebar-search-btn" type="submit" value="Search" />
                        </div>
                        
                    </div>
                </form>
            </div>
       )
   }


}

export default connect()(SearchLandingPage);