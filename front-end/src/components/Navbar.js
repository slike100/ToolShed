import React from "react";
import { auth, provider } from '../utils/firebaseConfig';

import Login from "./Login";


class Navbar extends React.Component {

  render() {
    return (
      <div>
        <Login />
        {/* <Logout /> */}
      </div>
    )
  }
}

export default Navbar;