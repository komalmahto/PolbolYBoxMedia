import { GET_LANGUAGE } from './Types';
import axios from '../axios';

export const fetchLanguage = (lang) => async (dispatch) => {
      dispatch({type:GET_LANGUAGE,payload:lang})
};
