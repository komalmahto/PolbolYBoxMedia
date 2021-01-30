import { GET_POLLS} from '../Actions/Types';

const initialState = {
  polls: null,
};


export default function reduce(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POLLS:
      state.polls = payload;
      return state;
  
    default:
      return state;
  }
}
