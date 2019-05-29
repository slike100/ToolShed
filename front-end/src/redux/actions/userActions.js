import store from "../store";
import { userBaseUrl } from "../../utils/globalConstants";
import axios from "axios";

import {
  NEW_USER,
  DELETE_USER,
  EDIT_USER,
  GET_USER_DATA,
  PAY_STRIPE,
  SIGN_UP_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_RENTAL_RECORD
} from "../types/userTypes";
import stripe from "../../components/stripe";

// AXIOS ADD NEW USERS
export function addNewUser(userObj) {
  // console.log(userObj);

  return dispatch => {
    return axios
      .post(`${userBaseUrl}newUser/`, userObj)
      .then(res => {
        if (res.status === 200) {
          console.log("Response Data: ", res.data);

          const action = {
            type: NEW_USER,
            payload: userObj
          };
          dispatch(action);
        }
      })
      .catch(err => {
        console.log("Error adding new user: ", err);

        const action = {
          type: NEW_USER,
          payload: []
        };
        dispatch(action);
      });
  };
}

// AXIOS DELETE USER
export function deleteUser(userId) {
  console.log(userId);

  return dispatch => {
    return axios
      .delete(`${userBaseUrl}/deleteUser/`, { data: { userId } })
      .then(res => {
        if (res.status === 200 && res.data === "successfully deleted user") {
          const action = {
            type: DELETE_USER
            // payload: res.data,
          };
          dispatch(action);
        }
      })
      .catch(err => {
        console.log("Error deleting user: ", err);

        const action = {
          type: DELETE_USER
          // payload: []
        };
        dispatch(action);
      });
  };
}

// AXIOS EDIT USERS, this also creates users on sign-up
export function updateUser(userObj) {
  return dispatch => {
    return axios
      .put(`${userBaseUrl}updateUser/${userObj.uid}`, userObj)
      .then(res => {
        if (res.status === 200 && res.data) {
          const action = {
            type: EDIT_USER,
            payload: res.data
          };
          dispatch(action);
        }
      })
      .catch(err => {
        console.log("Error adding new user: ", err);
        const action = {
          type: EDIT_USER,
          payload: []
        };
        dispatch(action);
      });
  };
}

//AXIOS GET USER DATA
export function getUserData(id) {
  return dispatch => {
    return axios
      .get(`${userBaseUrl}/userData/?id=${id}`)
      .then(res => {
        if (res.status === 200 && res.data) {
          console.log(`SUCCESS! Got user data`, res.data);

          const action = {
            type: GET_USER_DATA,
            payload: res.data
          };
          dispatch(action);
        }
      })
      .catch(err => {
        console.log("Error getting user data: ", err);

        const action = {
          type: GET_USER_DATA,
          payload: []
        };
        dispatch(action);
      });
  };
}

export function logoutUser() {
  const action = {
    type: LOGOUT_USER
  };
  return action;
}

export const payStripe = stripeObj => {
  console.log(stripeObj);
  return dispatch => {
    return axios
      .post(
        "https://us-central1-toolshed-1dd98.cloudfunctions.net/stripe/",
        stripeObj,
        { headers: { "Content-type": "application/json" } }
      )
      .then(res => {
        console.log(res);
        const action = {
          type: PAY_STRIPE,
          payload: res
        };
        dispatch(action);
      })
      .catch(err => console.log(err));
  };
};

export const getRecordData = toolId => {
  return dispatch => {
    return axios
      .get(
        `https://us-central1-toolshed-1dd98.cloudfunctions.net/toolRentalRecord/rentalRecord/${toolId}`
      )
      .then(res => {
        if (res.status == 200 && res.data) {
          console.log(res.data[0]);
          return axios
            .put(
              `https://us-central1-toolshed-1dd98.cloudfunctions.net/toolRentalRecord/updateToolRentalRecord/${
                res.data[0].recordId
              }`
            )
            .then(res => {
              console.log(res);
              console.log(res.data);
              const action = {
                type: GET_RENTAL_RECORD,
                payload: res.data
              };
              dispatch(action);
            })
            .catch(err => console.log(err));
        }
      });
  };
};
