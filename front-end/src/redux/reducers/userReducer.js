import {
  PAY_STRIPE,
  NEW_USER,
  DELETE_USER,
  EDIT_USER,
  GET_USER_DATA,
  LOGIN_USER,
  LOGOUT_USER,
  SIGN_UP_USER,
  GET_RENTAL_RECORD
} from "../types/userTypes";

const initialState = {
  auth: false,
  user: null,
  stripeToken: "",
  rentalRecord: {}
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PAY_STRIPE:
      console.log("We are in the Pay Stripe Reducer");
      console.log(payload);
      return {
        ...state,
        stripeToken: payload
      };

    case NEW_USER:
      return { ...state, auth: true, user: payload };

    case DELETE_USER:
      return { ...state, auth: false, user: null };

    case EDIT_USER:
      return { ...state, auth: true, user: payload };

    case GET_USER_DATA:
      return { ...state, auth: true, user: payload };

    case SIGN_UP_USER:
      console.log(payload);
      return { ...state, user: payload };

    case LOGIN_USER:
      return { ...state, auth: true, user: payload };

    case LOGOUT_USER:
      return { ...state, auth: false, user: null };

    case GET_RENTAL_RECORD:
      return { ...state, rentalRecord: payload };

    default:
      return state;
  }
}
