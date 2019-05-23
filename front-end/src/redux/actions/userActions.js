import axios from "axios";

import {
    PAY_STRIPE,
} from "../user/userTypes";


// example action

// export const actionTYPE = {

// action logic goes here 

//     const action = {
//         type: TypeError,
//         payload: ??
//     }
//     return action;
// }

export const payStripe = () => {
    return dispatch => {
        return axios.post('');
    }
}