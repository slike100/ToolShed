import React from "react";
import { connect } from "react-redux";
import Checkout from "./Checkout";
import "materialize-css/dist/css/materialize.min.css";

class SearchCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolSelected: "",
      doIOwnTools: false
    };
  }

  //if toolsOwned > 0 then loop through and check to see if the tool from
  //if e.target.dataset.id == toolsOwned[i].id then do not display

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

  createSearchCards = () => {
    if (!this.props.toolsSearched || this.state.doIOwnTools === true) {
      return (
        <div className="sidebar-card-null">
          <p>
            Search for tools above &nbsp;
            <i className="far fa-hand-point-up" />
          </p>
        </div>
      );
    } else if (this.props.toolsSearched.length === 0) {
      return (
        <div className="sidebar-card-null">
          <p>
            No Tools found. &nbsp;
            <i className="fas fa-exclamation-triangle" />
          </p>
        </div>
      );
    } else {
      return this.props.toolsSearched.map((tool, index) => {
        if (tool.uid === this.props.user.uid) {
          return;
        } else {
          if (!tool.isRented) {
            return (
              <div class="sidebar-card position-relative" key={index}>
                <img className="sidebar-card-img" src={tool.photo} alt="" />
                <p className="sidebar-card-name">{tool.name}</p>
                <p className="sidebar-card-price">${tool.priceRatePerDay}</p>
                <div
                  className="sidebar-card-overlay modal-trigger webkit-appearance-none"
                  type="submit"
                  name="action"
                  data-id={tool.toolId}
                  data-target="checkoutModal"
                  onClick={this.getFullTool}
                />
              </div>
            );
          } else if (tool.isRented) {
            return (
              <div class="sidebar-card modal-trigger" key={index}>
                <img className="sidebar-card-img" src={tool.photo} alt="" />
                <p className="sidebar-card-name">{tool.name}</p>
                <i className="fas fa-exclamation-triangle fa-2x sidebar-card-triangle-margin-right sidebar-card-btn-orange" />
              </div>
            );
          }
        }
      });
    }
  };

  render() {
    var modalBuffer; // Added to fix race condition between setState and Modal pop-up
    if (!this.state.toolSelected) {
      modalBuffer = <div />;
    } else {
      modalBuffer = <Checkout fullTool={this.state.toolSelected} />;
    }

    return (
      <div>
        <div>{modalBuffer}</div>
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
