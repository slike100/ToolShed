import "materialize-css/dist/css/materialize.min.css";
// import './CSS/UserProfilePage.css';
import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import "./CSS/RentedToolCard.css";

class RentedToolCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  getRentalRecord = () => {
    for (let i = 0; i < this.props.tools.length; i++) {
      console.log(this.props.tools[i]);
    }
    axios
      .get(
        `https://us-central1-toolshed-1dd98.cloudfunctions.net/toolRentalRecord/rentalRecord/${
          this.props.tools.toolId
        }`
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  createToolRentingCards = () => {
    this.getRentalRecord();
    console.log(this.props.tools);
    return this.props.tools.map((tool, index) => {
      return (
        <div className="row1">
          <div className="card toolCard">
            <div className="card-image">
              <img src={this.props.tools.photo} />
            </div>
            <div className="card-content">
              <span className="card-title">{this.props.tools.name}</span>
              {/* <p>I am a very simple card. I am good at containing small bits of information.</p> */}
              <h6>DUE DATE</h6>
            </div>
            <div className="card-action return">
              <h6>Contact Owner: test@test</h6>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    // grab and place google photo as profile button background-image
    var profilePhoto = "none";
    if (this.props.auth) {
      profilePhoto = `url(${this.props.auth.photoURL})`;
    }
    return <div>{this.createToolRentingCards()}</div>;
  }
}

const mapDispatchToProps = {};

function mapStateToProps(state) {
  return {
    tools: state.tool.toolsRenting
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RentedToolCard);
