import {SIGNIN,LOGOUT,UPDATEUSER} from '../Actions/Types';

let token=JSON.parse(localStorage.getItem('authToken'))
const initialState = {
  token: '',
  user:{}
};


export default function reduce(state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case SIGNIN:
      state.token = payload.token;
      state.user=payload.user;
      localStorage.setItem('authToken',JSON.stringify(payload.token));

      return state;

      case LOGOUT:
        localStorage.removeItem('authToken')
      state.token = null;
      state.user={};
      return state;

      case UPDATEUSER:
          state.user=payload;
          return state
    
    default:
      return state;
  }
}