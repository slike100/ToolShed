import {
  PAY_STRIPE,
} from "../types/userTypes";

const initialState = {
  stripeToken: '',
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PAY_STRIPE:
      console.log('We are in the Pay Stripe Reducer');
      console.log(payload);
    return {
      ...state,
      stripeToken: payload,
    }

    default:
      return state;
  }
}
