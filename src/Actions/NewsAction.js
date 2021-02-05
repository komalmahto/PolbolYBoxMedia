import { GET_NEWS } from './Types';
import axios from '../axios';

export const fetchNews = (english) => async (dispatch) => {
  try {
    axios.get(`/news?hindi=${!english}`)
    .then((res) => {
      console.log(res.data)
      dispatch({type:GET_NEWS,payload:res.data.payload})
    })
  } catch (error) {
    console.log(error)
  }
};
