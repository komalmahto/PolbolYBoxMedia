import { combineReducers } from 'redux-immer';
import produce from 'immer';
import news from './NewsReducer'
import polls from './PollsReducer'
export default combineReducers(produce,{
  news,
  polls

})

