import "materialize-css/dist/css/materialize.min.css";
// import './CSS/UserProfilePage.css';
import React from "react";
import { connect } from "react-redux";

import "./CSS/UserToolCard.css";

class UserToolCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  createToolOwnedCards = () => {
    console.log(this.props.tools);
    return this.props.tools.map((tool, index) => {
      return (
        <div className="row1">
          <div className="card toolCard">
            <div className="card-image">
              <img src={tool.photo} />
            </div>
            <div className="card-content">
              <span className="card-title">{tool.name}</span>
              <p>{tool.description}</p>
              <h6>{tool.priceRatePerDay}</h6>
            </div>
            <div className="card-action">
              <button
                className="btn-small waves-effect waves-light"
                type="submit"
                name="action"
                data-id={tool.toolId}
              >
                Edit Tool
              </button>
              <button
                className="btn-small waves-effect #e53935 red darken-1"
                type="submit"
                name="action"
                data-id={tool.toolId}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    // grab and place google photo as profile button background-image
    var profilePhoto = "none";
    if (this.props.auth) {
      profilePhoto = `url(${this.props.auth.photoURL})`;
    }
    return <div>{this.createToolOwnedCards()}</div>;
  }
}

const mapDispatchToProps = {};

function mapStateToProps(state) {
  return {
    tools: state.tool.toolsOwned
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserToolCard);
