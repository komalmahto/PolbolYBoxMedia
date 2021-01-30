import { GET_NEWS} from '../Actions/Types';

const initialState = {
  news: null,
};


export default function reduce(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NEWS:
      state.news = payload;
      return state;
    
    default:
      return state;
  }
}
