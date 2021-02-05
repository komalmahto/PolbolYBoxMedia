import { GET_POLLS } from './Types';
import axios from '../axios';

export const fetchPolls = (english) => async (dispatch) => {
  try {
    axios.get(`/common/polls?hindi=${!english}`)
    .then((res) => {
      console.log(res.data)
      dispatch({type:GET_POLLS,payload:res.data.payload})
    })
  } catch (error) {
    console.log(error)
  }
};
