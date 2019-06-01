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

  getFullTool = (e) => {
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
        <div className="sidebar-card-null">
          <p>Search for tools above &nbsp;<i className="far fa-hand-point-up"></i></p>
        </div>
      );
    } else if (this.props.toolsSearched.length === 0) {
      return (
        <div className="sidebar-card-null">
          <p>No Tools found. &nbsp;<i className="fas fa-exclamation-triangle"></i></p>
        </div>
      );
    } else {
      return this.props.toolsSearched.map((tool, index) => {
        var button;
        if (!tool.isRented) {
          button = (
            <button
              className="btn-small waves-effect waves-light btn modal-trigger edit-button"
              // className="modal-trigger searchcard-clear-button"
              type="submit"
              name="action"
              data-id={tool.toolId}
              data-target="checkoutModal"
              onClick={this.getFullTool}
            >
              <i className="fas fa-info-circle fa-2x"></i>
            </button>
          );
        } else if (tool.isRented) {
          button = <i className="fas fa-exclamation-triangle fa-2x triangle-margin-right btn-yellow"></i>;
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
      });
    }
  };

  render() {
    var modalBuffer; // Added to fix race condition between setState and Modal pop-up
    if (!this.state.toolSelected) {
      modalBuffer = <div></div>;
    } else {
      modalBuffer = <Checkout fullTool={this.state.toolSelected} />
    }

    return (
      <div>
        <div>
          {modalBuffer}
        </div>
        <div id="sidebar-card-wrapper">{this.createSearchCards()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toolsSearched: state.tool.toolsSearched
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchCard);
