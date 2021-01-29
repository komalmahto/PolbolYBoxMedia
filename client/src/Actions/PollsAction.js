import { GET_POLLS } from './Types';
import axios from '../axios';

export const fetchPolls = () => async (dispatch) => {
  try {
    axios.get('/common/polls')
    .then((res) => {
      console.log(res.data)
      dispatch({type:GET_POLLS,payload:res.data.payload})
    })
  } catch (error) {
    console.log(error)
  }
};
