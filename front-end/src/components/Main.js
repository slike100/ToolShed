import React from "react";
import { connect } from "react-redux";

import Navbar from "./Navbar";

// import actions here if needed

class Main extends React.Component {

  render() {
    // console.log(this.props);
    return (
      <div>
        <Navbar />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // count: state.tool.count
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
