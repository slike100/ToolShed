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

    for (let i = 0; i < this.props.tools.length; i++) {

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
    if (this.state.records.length == 0) {
      return <div className="tool-card-no-tool-message">
        <p className="tool-card-no-tool-message-p">You're not currently renting any tools &nbsp;<i class="far fa-frown-open"></i></p>
      </div>
    } else {
      var newDate = new Date(this.state.records[0].dueDate);
      var newDateString = newDate.toDateString();
      return this.props.tools.map((tool, index) => {

        // var rented; // Saving for MVP 2.0 - for now, when an owner marks a tool as returned it will not show up in the tools array.
        // if (tool.isRented == false || !tool.isRented) {
        //   var rented = "Yes";
        // } else {
        //   var rented = "No";
        // }
        return (
          <div className="user-tool-card-wrapper">
            <div className="card toolCard">
              <div className="card-image">
                <img src={tool.photo} />
              </div>
              <div className="card-content">
                <span className="card-title">{tool.name}</span>
                <h6>Please return this tool by {newDateString}</h6>
                {/* <h6>Owner marked as Returned? &nbsp;&nbsp;{rented}</h6> */}
              </div>
              <div className="card-action">
                <p>Owner Email: &nbsp;<a href={`mailto:${this.state.records[0].ownerEmail}`}>{this.state.records[0].ownerEmail}</a></p>
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
    return <div>{this.createToolRentingCards()}</div>;
  }
};

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
