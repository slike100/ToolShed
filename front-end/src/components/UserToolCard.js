import "materialize-css/dist/css/materialize.min.css";
// import './CSS/UserProfilePage.css';
import React from "react";
import { connect } from "react-redux";
import {
  deleteTool,
  editTool,
  getToolsOwned
} from "../redux/actions/toolActions";
import {
  getRecordData,
  getUserData,
  payStripe
} from "../redux/actions/userActions";

import EditToolModal from "./EditToolModal";

import "./CSS/UserToolCard.css";
import axios from "axios";
import image from "../assets/img/ToolShed-Loading-Spinner.gif";

class UserToolCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tool: ""
    };
  }

  getSpecificTool = e => {
    let toolArr = this.props.tools;
    console.log(e.target.dataset.id);
    // const tool = toolArr.filter(id => toolId === id);
    // console.log(tool);
    console.log(toolArr);
    let tool;
    for (var i = 0; i < toolArr.length; i++) {
      if (e.target.dataset.id === toolArr[i].toolId) {
        console.log(toolArr[i]);
        tool = toolArr[i];
      }
    }
    this.setState({
      tool: tool
    });
    console.log(this.state.tool);
    // console.log(this.state.tool);
  };

  //on edit button get the data.target.id property
  //loop through tools owned match this id and grab that tool and set local state to that tool
  //on click function that sets local state to

  delete = async e => {
    e.preventDefault();
    var obj = {};
    obj.id = e.target.dataset.id;
    obj.uid = this.props.user.uid;
    await this.props.deleteTool(obj);
    await this.props.getToolsOwned(obj.uid);
    await this.props.getUserData(obj.uid);
  };

  checkIn = async e => {
    e.preventDefault();
    var data = e.target.dataset.id;
    var obj = { isRented: false };
    var stripeObj = {};
    await this.props.getRecordData(e.target.dataset.id);
    var rentee = await axios.get(
      `https://us-central1-toolshed-1dd98.cloudfunctions.net/user/userData/${
        this.props.record.rentalUserId
      }`
    );
    await this.props.editTool(data, obj);
    console.log(this.props.record);
    var rentalStartTime =
      this.props.record.rentalStartTime / (1000 * 60 * 60 * 24);
    console.log(rentalStartTime);
    var timeCheckedInDays =
      this.props.record.timeCheckedIn / (1000 * 60 * 60 * 24);
    console.log(timeCheckedInDays);
    var totalDaysRented = timeCheckedInDays - rentalStartTime;
    console.log(totalDaysRented);
    var amountToPay = totalDaysRented * this.props.record.pricePerDay * 100;
    console.log(amountToPay);
    var amountToDisplay = totalDaysRented * this.props.record.pricePerDay;
    amountToPay = amountToPay.toFixed();
    stripeObj.amount = amountToPay;
    stripeObj.description = `Congrats! Your tool has been checked in and you should recieve your payment of $${amountToDisplay} soon!`;
    console.log(rentee);
    stripeObj.source = rentee.data.stripeToken;
    console.log(rentee);
    await this.props.payStripe(stripeObj);
    await this.props.getToolsOwned(this.props.user.uid);
  };

  createToolOwnedCards = () => {
    console.log(this.props.tools);
    var button;
    if (!this.props.tools) {
      return <img src={image} />;
    } else
      return this.props.tools.map((tool, index) => {
        var button;
        if (tool.isRented) {
          button = (
            <button
              className="btn-small waves-effect #e53935 red darken-1"
              type="submit"
              name="action"
              data-id={tool.toolId}
              onClick={this.checkIn}
            >
              Check-In
            </button>
          );
        } else {
          button = (
            <button
              className="btn-small waves-effect #e53935 red darken-1"
              type="submit"
              name="action"
              data-id={tool.toolId}
              onClick={this.delete}
            >
              Delete
            </button>
          );
        }
        return (
          <div className="row1" key={index}>
            <div className="card toolCard">
              <div className="card-image">
                <img id="toolImage" src={tool.photo} />
              </div>
              <div className="card-content">
                <span className="card-title">{tool.name}</span>
                <p>{tool.description}</p>
                <h6>${tool.priceRatePerDay} per day</h6>
              </div>
              <div className="card-action">
                <button
                  class="btn-small waves-effect waves-light btn modal-trigger edit-button"
                  type="submit"
                  name="action"
                  data-id={tool.toolId}
                  data-target="editToolModal"
                  onClick={this.getSpecificTool}
                >
                  Edit Tool
                </button>
                {button}
              </div>
            </div>
          </div>
        );
      });
  };

  render() {
    if (this.props.tools.length == 0) {
      return <h1>Post some tools to make some extra cash!</h1>;
    }
    return (
      <div>
        <div>{this.createToolOwnedCards()}</div>
        {/* <EditToolModal tool={this.state.tool} /> */}
      </div>
    );
  }
}

const mapDispatchToProps = {
  deleteTool,
  getUserData,
  getRecordData,
  payStripe,
  editTool,
  getToolsOwned
};

function mapStateToProps(state) {
  return {
    tools: state.tool.toolsOwned,
    user: state.user.user,
    record: state.user.rentalRecord
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserToolCard);
