import React from "react";
import { connect } from "react-redux";
import Checkout from "./Checkout";
import "materialize-css/dist/css/materialize.min.css";

class SearchCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolSelected: ""
    };
  }

  getFullTool = e => {
    var tool;
    for (let i = 0; i < this.props.toolsSearched.length; i++) {
      if (e.target.dataset.id === this.props.toolsSearched[i].toolId) {
        var tool = this.props.toolsSearched[i];
      }
    }
    this.setState({
      toolSelected: tool
    });
  };

  // getToolClicked = e => {
  //   console.log(e.target.dataset.id);
  //   this.setState({
  //     toolSelected: e.target.dataset.id
  //   });
  // };

  createSearchCards = () => {
    if (!this.props.toolsSearched) {
      return (
        <div className="sidebar-card">
          <p>^ Search for tools above ^</p>
        </div>
      );
    } else if (this.props.toolsSearched.length === 0) {
      return (
        <div className="sidebar-card">
          <p>No Tools found in your area!</p>
        </div>
      );
    } else {
      return this.props.toolsSearched.map((tool, index) => {
        var button;
        console.log(tool.isRented);
        if (this.props.auth === true || this.props.user === null) {
          if (!tool.isRented && this.props.uid !== tool.uid) {
            button = (
              <button
                class="btn-small waves-effect waves-light btn modal-trigger edit-button"
                type="submit"
                name="action"
                data-id={tool.toolId}
                data-target="checkoutModal"
                onClick={this.getFullTool}
              >
                Details
              </button>
            );
          } else if (tool.isRented) {
            button = <p>Sorry, this tool is currently being rented.</p>;
          }
          return (
            <div>
              <div className="sidebar-card" key={index}>
                <img className="sidebar-card-img" src={tool.photo} alt="" />
                <p className="sidebar-card-name">{tool.name}</p>
                <p className="sidebar-card-price">${tool.priceRatePerDay}</p>
                {button}
              </div>
            </div>
          );
        } else if (this.props.auth === false) {
          if (!tool.isRented) {
            button = (
              <button
                class="btn-small waves-effect waves-light btn modal-trigger edit-button"
                type="submit"
                name="action"
                data-id={tool.toolId}
                data-target="checkoutModal"
                onClick={this.getFullTool}
              >
                Details
              </button>
            );
          } else if (tool.isRented) {
            button = <p>Sorry, this tool is currently being rented.</p>;
          }
          return (
            <div>
              <div className="sidebar-card" key={index}>
                <img className="sidebar-card-img" src={tool.photo} alt="" />
                <p className="sidebar-card-name">{tool.name}</p>
                <p className="sidebar-card-price">${tool.priceRatePerDay}</p>
                {button}
              </div>
            </div>
          );
        }
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <Checkout fullTool={this.state.toolSelected} />
        </div>
        <div id="sidebar-card-wrapper">{this.createSearchCards()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toolsSearched: state.tool.toolsSearched,
    user: state.user.user,
    auth: state.user.auth
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchCard);
