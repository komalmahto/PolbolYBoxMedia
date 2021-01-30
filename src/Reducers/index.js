import { combineReducers } from 'redux-immer';
import produce from 'immer';
import news from './NewsReducer'
import polls from './PollsReducer'
import awards from './AwardsReducer'
export default combineReducers(produce,{
  news,
  polls,
  awards

})

