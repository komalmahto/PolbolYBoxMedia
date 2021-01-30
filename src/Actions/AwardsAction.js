import { GET_AWARDS } from './Types';
import axios from '../axios';

export const fetchAwards = () => async (dispatch) => {
  try {
    axios.get('/award/fetchAwardsAndCategories')
    .then((res) => {
      console.log(res.data)
      dispatch({type:GET_AWARDS,payload:res.data.payload})
    })
  } catch (error) {
    console.log(error)
  }
};
