import store from "../store";
import axios from "axios";
import { toolBaseUrl } from "../../utils/globalConstants";

import {
  CREATE_TOOL,
  TOOL_DATA,
  DELETE_TOOL,
  EDIT_TOOL
} from "../types/toolTypes";

//CREATE A NEW TOOL AXIOS REQUEST
export const createTool = toolObj => {
  return dispatch => {
    return axios
      .post(`${toolBaseUrl}/newTool`, toolObj)
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
  console.log(searchObj);
  return dispatch => {
    return axios
      .get(
        `${toolBaseUrl}searchTools/?lat=${searchObj.lat}&long=${
        searchObj.long
        }&name=${searchObj.name}&distance=${searchObj.distance}`
      )
      .then(res => {
        if (res.status === 200) {
          console.log(`Success, search was performed.`);
          console.log(res.data);
          const action = {
            type: TOOL_DATA,
            payload: res.data
          };
          dispatch(action);
        }
      })
      .catch(err => {
        console.log(`There was an error performing the search. Error: `, err);
        const action = {
          type: TOOL_DATA
          //Is a payload necessary here?
        };
        dispatch(action);
      });
  };
};

//DELETE TOOL AXIOS REQUEST
export const deleteTool = toolId => {
  return dispatch => {
    return axios
      .delete(`${toolBaseUrl}/deleteTool`, toolId)
      .then(res => {
        if (res.status === 200) {
          console.log(`Success, tool was deleted.`);
          console.log(res.data);
          const action = {
            type: DELETE_TOOL
            //Is a payload necessary here?
          };
          dispatch(action);
        }
      })
      .catch(err => {
        console.log(`There was an error deleting the tool. Error: `, err);
        const action = {
          type: DELETE_TOOL
          //Is a payload necessary here?
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
          dispatch(action);
        }
      })
      .catch(err => {
        console.log(`There was an error performing the search. Error: `, err);
        const action = {
          type: EDIT_TOOL
          //Is a payload necessary here?
        };
        dispatch(action);
      });
  };
};
