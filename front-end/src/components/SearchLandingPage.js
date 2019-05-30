import React, { Component } from 'react';
import { connect } from "react-redux";

import "../components/CSS/Jumbotron.css";
class SearchLandingPage extends Component {
   constructor(props){
       super(props);

       this.state = {
        searchTool: "",
        searchAddress: "",
       };
   }



   render(){
       return(
            <div className="form">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            {/* <i className="material-icons prefix">account_circle</i> */}
                            <input id="icon_prefix" type="text" className="validate" />
                            <label for="icon_prefix">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <i className="material-icons prefix">email</i>
                            <input id="icon_telephone" type="email" className="validate" />
                            <label for="icon_telephone">Email Id</label>
                        </div>
                    </div>
                </form>
            </div>
       )
   }


}

export default connect()(SearchLandingPage);