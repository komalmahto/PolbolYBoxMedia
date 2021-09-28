import { SIGNIN, LOGOUT, UPDATEUSER } from "./Types";
// import axios from '../api/index';

export const fetchToken = (token, user) => async (dispatch) => {
  console.log(user, token, "useraction");
  dispatch({ type: SIGNIN, payload: { token, user } });
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const updateUser = (user) => async (dispatch) => {
  dispatch({ type: UPDATEUSER, payload: user });
};
