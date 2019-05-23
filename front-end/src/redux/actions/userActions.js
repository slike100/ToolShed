import axios from "axios";
import {
    PAY_STRIPE,
} from "../types/userTypes";


// example action

// export const actionTYPE = {

// action logic goes here 

//     const action = {
//         type: TypeError,
//         payload: ??
//     }
//     return action;
// }

export const payStripe = (tokenCard) => {
    return dispatch => {
        return axios.post('https://us-central1-toolshed-1dd98.cloudfunctions.net/stripe', {token: tokenCard})
        .then(res => {
            console.log(res);
            const action = {
                type: PAY_STRIPE,
                payload: res
            }
            dispatch(action)
        })
        .catch(err => console.log(err));
    }
}