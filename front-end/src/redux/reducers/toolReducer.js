import {
  CREATE_TOOL,
  TOOL_DATA,
  DELETE_TOOL,
  EDIT_TOOL,
  TOOLS_OWNED,
  TOOLS_RENTED
} from "../types/toolTypes";

const initialState = {
  toolsSearched: null,
  toolsOwned: [],
  toolsRenting: []
  //Not sure what else needs to be set in initial state
};


export default function toolReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TOOL:
      return { ...state };

    case TOOL_DATA:
      console.log(payload);
      return { ...state, toolsSearched: payload };

    case DELETE_TOOL:
      return { ...state };

    case EDIT_TOOL:
      return { ...state };

    case TOOLS_OWNED:
      return { ...state, toolsOwned: payload };

    case TOOLS_RENTED:
      return { ...state, toolsRenting: payload };

    default:
      return state;
  }
}
