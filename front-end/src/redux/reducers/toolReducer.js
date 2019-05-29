import {
  CREATE_TOOL,
  TOOL_DATA,
  DELETE_TOOL,
  EDIT_TOOL
} from "../types/toolTypes";

const initialState = {
  toolsSearched: [],
  toolsOwned: [],
  toolsRenting: []
  //Not sure what else needs to be set in initial state
};

export default function toolReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TOOL:
      return { ...state, tool: payload };

    case TOOL_DATA:
      return { ...state, toolsSearched: payload };

    case DELETE_TOOL:
      return { ...state, tool: payload };

    case EDIT_TOOL:
      return { ...state, toolsOwned: payload };

    default:
      return state;
  }
}
