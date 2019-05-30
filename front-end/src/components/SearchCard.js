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
    console.log(this.props.toolsSearched);
    if (this.props.toolsSearched.length == 0 || !this.props.toolsSearched) {
      return (
        <div className="sidebar-card">
          <p>No Tools for you!</p>
        </div>
      );
    } else {
      return this.props.toolsSearched.map((tool, index) => {
        return (
          <div>
            <div className="sidebar-card" key={index}>
              <img className="sidebar-card-img" src={tool.photo} alt="" />
              <p className="sidebar-card-name">{tool.name}</p>
              <p className="sidebar-card-price">${tool.priceRatePerDay}</p>
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
            </div>
          </div>
        );
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
    toolsSearched: state.tool.toolsSearched
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchCard);
