import { combineReducers } from "redux";

import toolReducer from "./toolReducer.js";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    tool: toolReducer,
    user: userReducer,
});

export default rootReducer;
