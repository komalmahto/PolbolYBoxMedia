import { GET_AWARDS} from '../Actions/Types';

const initialState = {
  awards: null,
};


export default function reduce(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_AWARDS:
      state.awards = payload;
      return state;
    
    default:
      return state;
  }
}
