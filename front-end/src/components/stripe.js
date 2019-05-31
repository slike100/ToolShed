import React from "react";
import { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { connect } from "react-redux"; // import connect from Redux
import ConfirmationModal from "./ConfirmationModal"
import "materialize-css/dist/css/materialize.min.css";
import { userBaseUrl, baseUrl } from "../utils/globalConstants";
import moment from "moment";




import "./CSS/stripe.css";

import {
  payStripe,
  getRecordData,
  updateUser
} from "../redux/actions/userActions";
import { editTool } from "../redux/actions/toolActions";
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
    console.log(e.target.childNodes[0].parentElement.form[0].value);
    this.createRecord(e.target.childNodes[0].parentElement.form[0].value);
    let { token } = await this.props.stripe.createToken({
      name: this.props.user.displayName
    });
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

  createRecord = async days => {
    console.log("this is tool", this.props.tool);
    var d = new Date();
    console.log(d);
    var n = d.getTime();
    console.log(n);
    var daysDueIn = days * (1000 * 60 * 60 * 24);
    var dueDate = n + daysDueIn;
    this.setState({
      dueDate: moment(new Date(dueDate)).format("MMM Do YYYY")
    });
    console.log(dueDate);
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
        <button className="btn-large waves-effect waves-light btn modal-trigger submitBtn"
          onClick={this.submit}
          data-target="confirmationToolModal">
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
  updateUser
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
