import React from "react";
import { connect } from "react-redux";

// import actions here if needed

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //local React state here
        };
    };

    render() {
        console.log(this.props);
        return (
            <div>
                {/* components to be rendered will go here */}
            </div>
        )
    };
}

function mapStateToProps(state) {
    return {
        count: state.tool.count,
    };
}

const mapDispatchToProps = {

}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);