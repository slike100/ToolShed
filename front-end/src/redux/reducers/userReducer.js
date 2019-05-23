import {
  NEW_USER,
  DELETE_USER,
  EDIT_USER,
  GET_USER_DATA,
} from "../types/userTypes";

const initialState = {
  auth: null,
  user: null,
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_USER:
      return { ...state, auth: payload, user: payload };

    case DELETE_USER:
      return { ...state, auth: null, user: null };

    case EDIT_USER:
      return { ...state, auth: payload, user: payload };

    case GET_USER_DATA:
      return { ...state, auth: payload, user: payload };

    default:
      return state;
  }
}
