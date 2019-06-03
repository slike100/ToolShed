import store from "../store";
import axios from "axios";
import { toolBaseUrl, userBaseUrl } from "../../utils/globalConstants";

import {
  CREATE_TOOL,
  TOOL_DATA,
  DELETE_TOOL,
  EDIT_TOOL,
  TOOLS_OWNED,
  TOOLS_RENTED,
  TOOL_SEARCH,
  CLEAR_SEARCH
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
  return dispatch => {
    return axios
      .get(
        `${toolBaseUrl}searchTools/?lat=${searchObj.lat}&long=${
          searchObj.long
        }&name=${searchObj.name}&distance=${searchObj.distance}`
      )
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          console.log("Successfully searched for tools!");
          var data;
          console.log(res.data);
          // if (!res.data.length === 0) {
          //   data = [];
          // } else {
          data = res.data;

          const action = {
            type: TOOL_DATA,
            payload: data
          };

          dispatch(action);
        }
      })
      .catch(err => {
        console.log(`There was an error performing the search. Error: `, err);
        const action = {
          type: TOOL_DATA,
          payload: []
        };

        dispatch(action);
      });
  };
};

//DELETE TOOL AXIOS REQUEST
export const deleteTool = toolObj => {
  let s = store.getState();
  console.log(s);
  console.log(toolObj);
  return dispatch => {
    return axios
      .delete(`${toolBaseUrl}deleteTool/`, { data: toolObj })
      .then(res => {
        if (res.status === 200) {
          console.log(`Success, tool was deleted.`);

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
        console.log(`in the then`);
        if (res.status === 200) {
          console.log(`Successfully edited your ${toolObj.name}!`);

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

//GET ALL TOOLS OWNED BY USER
export const getToolsOwned = uid => {
  return dispatch => {
    return axios
      .get(`${userBaseUrl}allToolsOwnedForOneUser/${uid}`)
      .then(res => {
        if (res.status === 200 && res.data) {
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
          const action = {
            type: TOOLS_RENTED,
            payload: res.data
          };

          dispatch(action);
        }
      })
      .catch(err => {
        console.log(`There was an error getting tools rented. Error: `, err);
        const action = {
          type: TOOLS_RENTED,
          payload: []
        };
        return action;
      });
  };
};

export const toolSearchLocation = searchObj => {
  const action = {
    type: TOOL_SEARCH,
    payload: searchObj
  };
  return action;
};

export const clearToolSearch = () => {
  const action = {
    type: CLEAR_SEARCH
  };
};
