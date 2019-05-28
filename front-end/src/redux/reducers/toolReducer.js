import {
  CREATE_TOOL,
  TOOL_DATA,
  DELETE_TOOL,
  EDIT_TOOL,
  TOOLS_OWNED
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
      return { ...state, tools: payload };

    case TOOL_DATA:
      return { ...state, tools: payload };

    case DELETE_TOOL:
      return { ...state, tools: payload };

    case EDIT_TOOL:
      return { ...state, toolsOwned: payload };

    case TOOLS_OWNED:
      return { ...state, toolsOwned: payload };

    default:
      return state;
  }
}
