import {
  CREATE_TOOL,
  TOOL_DATA,
  DELETE_TOOL,
  EDIT_TOOL
} from "../types/toolTypes";

const initialState = {
  isRented: false
  //Not sure what else needs to be set in initial state
};

export default function toolReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TOOL:
      return { ...state, auth: payload, user: payload };

    case TOOL_DATA:
      return { ...state, auth: null, user: null };

    case DELETE_TOOL:
      return { ...state, auth: payload, user: payload };

    case EDIT_TOOL:
      return { ...state, auth: payload, user: payload };

    default:
      return state;
  }
}
