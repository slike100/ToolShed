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
  LOGOUT_USER
} from "../types/userTypes";

// AXIOS ADD NEW USERS//
export function addNewUser(userObj) {
  console.log(userObj);

  return dispatch => {
    return axios
      .post(`${userBaseUrl}/newUser/`, userObj)
      .then(res => {
        if (res.status === 200 && res.data === "successfully added new user") {
          console.log("Response Data: ", res.data);

          const action = {
            type: NEW_USER,
            payload: res.data
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
      .delete(`${userBaseUrl}/deleteUser/`, userId)
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

// AXIOS EDIT USERS
export function UpdateUser(userObj) {
  console.log(userObj);

  return dispatch => {
    return axios
      .put(`${userBaseUrl}/UpdateUser/${userObj.uid}`, userObj) // NOT SURE IF IT UID OR ID FOR THIS REQUEST.
      .then(res => {
        if (res.status === 200 && res.data) {
          console.log("successfully updated user!");
          console.log("Response Data: ", res.data);

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

export function signUpUser(authObj) {
  console.log(authObj);
  return dispatch => {
    return axios
      .put(`${userBaseUrl}updateUser/${authObj.uid}`, authObj)
      .then(res => {
        if (res.status === 200) {
          console.log("Response Data: ", res.data);

          const action = {
            type: SIGN_UP_USER,
            payload: res.data
          };
          dispatch(action);
        }
      })
      .catch(err => {
        console.log("Error adding new user: ", err);

        const action = {
          type: SIGN_UP_USER,
          payload: []
        };
        dispatch(action);
      });
  };
}
// export function setLatLng(locObj) {
//   console.log(locObj);
//   const action = {
//     type: SET_LAT_LNG,
//     payload: locObj
//   };
//   return action;
// }

//LOGIN USER
export function loginUser(authObj) {
  console.log(authObj);
  return dispatch => {
    return axios
      .put(`${userBaseUrl}updateUser/${authObj.uid}`, authObj) // NOT SURE IF IT UID OR ID FOR THIS REQUEST.
      .then(res => {
        if (res.status === 200 && res.data) {
          console.log("Updated DB and logged in user!");
          console.log("Response Data: ", res.data);

          const action = {
            type: LOGIN_USER,
            payload: res.data
          };
          dispatch(action);
        }
      })
      .catch(err => {
        console.log("Error logging in, user does not yet exist in DB: ", err);

        const action = {
          type: LOGIN_USER,
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

export const payStripe = tokenCard => {
  return dispatch => {
    return axios
      .post("https://us-central1-toolshed-1dd98.cloudfunctions.net/stripe", {
        token: tokenCard
      })
      .then(res => {
        console.log(res);
        console.log(tokenCard);
        const action = {
          type: PAY_STRIPE,
          payload: tokenCard
        };
        dispatch(action);
      })
      .catch(err => console.log(err));
  };
};
