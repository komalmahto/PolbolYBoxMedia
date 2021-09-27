import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const store = createStore(
  rootReducer,
  {
    category: "",
    title: "",
    problem: null,
    reflink: "",
    photo: null,
  },
  composeWithDevTools()
);

export default store;
