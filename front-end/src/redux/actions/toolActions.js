import store from "../store";
import axios from "axios";
import { toolBaseUrl, userBaseUrl } from "../../utils/globalConstants";

import {
  CREATE_TOOL,
  TOOL_DATA,
  DELETE_TOOL,
  EDIT_TOOL,
  TOOLS_OWNED,
  TOOLS_RENTED
} from "../types/toolTypes";

//CREATE A NEW TOOL AXIOS REQUEST
export const createTool = toolObj => {
  console.log(toolObj);
  return dispatch => {
    console.log(toolObj);

    return axios
      .post(`${toolBaseUrl}newTool`, toolObj)
      .then(res => {
        if (res.status === 200) {
          console.log(`Successfully created a tool!`);

          console.log(res.data);
          const action = {
            type: CREATE_TOOL,
            payload: res.data
          };
          dispatch(action);
        }
      })
      .catch(err => {
        console.log(`There was an error performing the search. Error: `, err);
        const action = {
          type: CREATE_TOOL
          //Is a payload necessary here?
        };
        dispatch(action);
      });
  };
};

//SEARCH TOOLS/GET TOOL DATA AXIOS REQUEST
export const getToolData = searchObj => {
  //Will we be using state to get location or a passed in search object (state option is below)?
  //const { lat, long } = state
  //let s = store.getState();
  console.log(
    "Lat: ",
    searchObj.lat,
    "Long: ",
    searchObj.long,
    "Name: ",
    searchObj.name,
    "Distance: ",
    searchObj.distance
  );
  return dispatch => {
    return axios
      .get(
        `${toolBaseUrl}/searchTools/?lat=${searchObj.lat}long=${
          searchObj.long
        }name=${searchObj.name}`
      )
      .then(res => {
        if (res.status === 200) {
          console.log(`Success, search was performed.`);
          console.log(res.data);
          const action = {
            type: TOOL_DATA,
            payload: res.data
          };
          return action;
        }
      })
      .catch(err => {
        console.log(`There was an error performing the search. Error: `, err);
        const action = {
          type: TOOL_DATA
          //Is a payload necessary here?
        };
        return action;
      });
  };
};

//DELETE TOOL AXIOS REQUEST
export const deleteTool = toolObj => {
  console.log(toolObj);
  return dispatch => {
    return axios
      .delete(`${toolBaseUrl}deleteTool/`, { data: toolObj })
      .then(res => {
        if (res.status === 200) {
          console.log(`Success, tool was deleted.`);
          console.log(res);
          const action = {
            type: DELETE_TOOL
          };
          dispatch(action);
        }
      })
      .catch(err => {
        console.log(`There was an error deleting the tool. Error: `, err);
        const action = {
          type: DELETE_TOOL
        };
        dispatch(action);
      });
  };
};

//UPDATE TOOL AXIOS REQUEST
export const editTool = (toolId, toolObj) => {
  return dispatch => {
    return axios
      .put(`${toolBaseUrl}updateTool/${toolId}`, toolObj)
      .then(res => {
        if (res.status === 200) {
          console.log(`Successfully edited your ${toolObj.name}!`);
          console.log(res.data);
          const action = {
            type: EDIT_TOOL,
            payload: res.data
          };
          return action;
        }
      })
      .catch(err => {
        console.log(`There was an error performing the search. Error: `, err);
        const action = {
          type: EDIT_TOOL
          //Is a payload necessary here?
        };
        return action;
      });
  };
};

//GET ALL TOOLS OWNED BY USER
export const getToolsOwned = uid => {
  return dispatch => {
    return axios
      .get(`${userBaseUrl}allToolsOwnedForOneUser/${uid}`)
      .then(res => {
        if (res.status === 200 && res.data) {
          console.log(`Success, got all tools owned by user ${uid}`);
          console.log(res.data);
          const action = {
            type: TOOLS_OWNED,
            payload: res.data
          };
          dispatch(action);
        }
      })
      .catch(err => {
        console.log(`There was an error getting tools owned. Error: `, err);
        const action = {
          type: TOOLS_OWNED,
          payload: []
        };
        return action;
      });
  };
};

//GET ALL TOOLS RENTED BY USER
export const getToolsRented = uid => {
  return dispatch => {
    return axios
      .get(`${userBaseUrl}allToolsRentedForOneUser/${uid}`)
      .then(res => {
        if (res.status === 200 && res.data) {
          console.log(`Success, got all tools rented by user ${uid}`);
          console.log(res.data);
          const action = {
            type: TOOLS_RENTED,
            payload: res.data
          };
          dispatch(action);
        }
      })
      .catch(err => {
        console.log(`There was an error getting tools owned. Error: `, err);
        const action = {
          type: TOOLS_RENTED,
          payload: []
        };
        return action;
      });
  };
};
