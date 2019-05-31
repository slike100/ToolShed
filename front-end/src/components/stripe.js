import React from "react";
import { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { connect } from "react-redux"; // import connect from Redux
import ConfirmationModal from "./ConfirmationModal";
import "materialize-css/dist/css/materialize.min.css";
import { userBaseUrl, baseUrl } from "../utils/globalConstants";
import moment from "moment";



import "./CSS/stripe.css";

import {
  payStripe,
  getRecordData,
  updateUser
} from "../redux/actions/userActions";
import { editTool, getToolsRented } from "../redux/actions/toolActions";
import axios from "axios";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tool: this.props.tool,
      ownerEmail: "",
      ownerName: "",
      dueDate: ""
    }
  }

  getUserData = (id) => {
    return axios
      .get(`${userBaseUrl}userData/${id}`)
      .then(res => {
        if (res.status === 200 && res.data) {
          console.log(`SUCCESS! Got user data`, res.data);
          this.setState({
            ownerEmail: res.data.email,
            ownerName: res.data.userName,

          });
        }
      })
      .catch(err => {
        console.log("Error getting user data: ", err);
      });
  }



  submit = async e => {
    e.preventDefault();
    var days = e.target.childNodes[0].parentElement.form[0].value;
    let { token } = await this.props.stripe.createToken({
      name: this.props.user.displayName
    });
    await this.createRecord(days, token);
    console.log(token);
    // var user = await axios.post(
    //   `https://us-central1-toolshed-1dd98.cloudfunctions.net/stripe/createUser/`,
    //   { source: token, email: this.props.user.email }
    // );
    // console.log(user);


    var updated = await this.props.updateUser({
      uid: this.props.user.uid,
      stripeToken: token.id
    });
    console.log(updated);


    await this.getUserData(this.props.tool.uid)
  };

  createRecord = async (days, token) => {
    console.log("this is tool", this.props.tool);
    console.log(days);
    var d = new Date();
    console.log(d);
    var n = d.getTime();
    console.log(n);
    var daysDueIn = days * (1000 * 60 * 60 * 24);
    console.log(daysDueIn);
    var dueDate = parseInt(n) + parseInt(daysDueIn);

    console.log(dueDate);
    
    var checkInDate = n + daysDueIn;
    this.setState({
      dueDate: moment(new Date(checkInDate)).format("MMM Do YYYY")
    });


    var recordObj = {
      ownerId: this.props.tool.uid,
      rentalUserId: this.props.user.uid,
      dueDate: dueDate, //placeholder, will be dueDate variable above
      pricePerDay: this.props.tool.priceRatePerDay,
      recordIds: this.props.user.recordIds,
      toolId: this.props.tool.toolId
    };
    console.log(recordObj);
    await axios
      .post(
        `https://us-central1-toolshed-1dd98.cloudfunctions.net/toolRentalRecord/newRentalRecord/`,
        recordObj
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
    var updatedTool = await axios.put(
      `https://us-central1-toolshed-1dd98.cloudfunctions.net/tool/updateTool/${
        this.props.tool.toolId
      }`,
      {
        isRented: true
      }
    );
    console.log(updatedTool);
    var arr = this.props.user.toolsBeingRented;
    console.log(arr);
    arr.push(this.props.tool.toolId);
    console.log(arr);
    await axios
      .put(
        `https://us-central1-toolshed-1dd98.cloudfunctions.net/user/updateUser/${
          this.props.user.uid
        }`,
        { toolsBeingRented: arr }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));

    var stripeObj = {};
    console.log(days);
    console.log(this.props.tool);
    var amountToDisplay = days * this.props.tool.priceRatePerDay;
    var amountToPay = (days * this.props.tool.priceRatePerDay).toFixed() * 100;
    console.log(amountToDisplay);
    console.log(amountToPay);
    stripeObj.amount = amountToPay;
    stripeObj.description = `User (UID:${
      this.props.user.uid
    }) has paid ${amountToDisplay}. They have rented TOOL-ID: ${
      this.props.tool.toolId
    } for ${days}`;
    stripeObj.source = token.id;
    await this.props.payStripe(stripeObj);
    console.log(
      `Congrats! You have successfully rented a tool! $${amountToDisplay} will be charged to your card soon! Please be aware that you will be charged any subsiquent late fees if you do not check the tool in on time.`
    );
    this.props.getToolsRented(this.props.user.uid);
  };

  render() {
    return (
      <div className="checkout">
        <CardElement
          style={{
            base: {
              fontSize: "20px"
            }
          }}
        />
        <button
          className="btn-large waves-effect waves-light btn modal-trigger submitBtn"
          onClick={this.submit}
          data-target="confirmationToolModal"
        >
          BOOK NOW
        </button>
        <div>
          <ConfirmationModal tool={this.props.tool} dueDate={this.state.dueDate} ownerName={this.state.ownerName} ownerEmail={this.state.ownerEmail} />
        </div>
      </div>
    );
  }
}

const Stripe = injectStripe(CheckoutForm);

const mapDispatchToProps = {
  payStripe,
  getRecordData,
  editTool,
  updateUser,
  getToolsRented
};

function mapStateToProps(state) {
  return {
    user: state.user.user,
    tools: state.tool.toolsSearched
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stripe);
