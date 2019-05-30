import React from "react";
import { connect } from "react-redux";

class SearchCard extends React.Component {
  constructor(props) {
    super(props);
  }

  click = () => {
    this.props.toggle();
    this.props.getToolClicked();
  };

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
        console.log(tool);
        return (
          <div className="sidebar-card" key={index}>
            <img className="sidebar-card-img" src={tool.photo} alt="" />
            <p className="sidebar-card-name">{tool.name}</p>
            <p className="sidebar-card-price">${tool.priceRatePerDay}</p>
            <button data-id={tool.toolId} onClick={this.props.getToolClicked}>
              Details
            </button>
          </div>
        );
      });
    }
  };

  render() {
    return <div id="sidebar-card-wrapper">{this.createSearchCards()}</div>;
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
