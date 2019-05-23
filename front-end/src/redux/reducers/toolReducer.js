import {
  CREATE_TOOL,
  TOOL_DATA,
  DELETE_TOOL,
  EDIT_TOOL
} from "../types/toolTypes";

const initialState = {
  tools: []
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
      return { ...state, tools: payload };

    default:
      return state;
  }
}