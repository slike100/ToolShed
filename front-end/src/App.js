import React from "react";
import { connect } from "react-redux";

import Main from "./components/Main";

// import actions here if needed

class App extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <div>
        <Main />
      </div>
    );
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
)(App);
