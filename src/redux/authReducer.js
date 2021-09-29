import { SIGNIN, LOGOUT, UPDATEUSER } from './Actions/Types';

let token = JSON.parse(localStorage.getItem('authToken'))
const initialState = {
  token: token || '',
  user: {},
};


export default function reduce(state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case SIGNIN:
      const nstate={...state,token:payload.token,user:payload.user}
      // localStorage.setItem('authToken', JSON.stringify(payload.token));
      return nstate;

    case LOGOUT:
      const nestate={...state,token:null,user:{}}
      localStorage.removeItem('authToken')
      return nestate;

    case UPDATEUSER:
      const neestate={...state,user:payload}
      return neestate

    default:
      return state;
  }
}