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
      records: []
    };
  }

  getRentalRecord = async () => {
    if (this.props.tools.length === 0) {
      return;
    }
    var _this = this;
    var records = [];
    console.log(this.props.tools);
    for (let i = 0; i < this.props.tools.length; i++) {
      console.log(this.props.tools[i]);
      var record = await axios.get(
        `https://us-central1-toolshed-1dd98.cloudfunctions.net/toolRentalRecord/rentalRecord/${
        this.props.tools[i].toolId
        }`
      );
      var user = await axios.get(
        `https://us-central1-toolshed-1dd98.cloudfunctions.net/user/userData/${
        record.data[0].ownerId
        }`
      );
    }
    var recordIn = record.data[0];
    recordIn.ownerEmail = user.data.email;
    this.setState({
      records: [...this.state.records, recordIn]
    });
  };

  createToolRentingCards = () => {
    console.log(this.props.tools);
    if (this.state.records.length == 0) {
      return <div>You are not currently renting any tools</div>;
    } else {
      console.log(this.state.records[0].dueDate);
      var newDate = new Date(this.state.records[0].dueDate);
      var newDateString = newDate.toDateString();
      return this.props.tools.map((tool, index) => {
        console.log(tool.isRented);
        var rented;
        if (tool.isRented == false || !tool.isRented) {
          var rented = "Yes";
        } else {
          var rented = "No";
        }
        return (
          <div className="row1">
            <div className="card toolCard">
              <div className="card-image">
                <img src={tool.photo} />
              </div>
              <div className="card-content">
                <span className="card-title">{tool.name}</span>
                <h6>Due Date: {newDateString}</h6>
                <h6>Checked In: {rented}</h6>
              </div>
              <div className="card-action return">
                <h6>Owner Email: {this.state.records[0].ownerEmail}</h6>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  componentDidMount() {
    if (this.props.tools) {
      this.getRentalRecord();
    } else {
      return;
    }
  }

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
