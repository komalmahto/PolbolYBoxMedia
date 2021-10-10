import { combineReducers } from "redux";
import auth from "./authReducer";
import pet from "./petitionReducer";
import lang from './languageReducer'

const rootReducer = combineReducers({
  auth,
  pet,
  lang
});
export default rootReducer;
