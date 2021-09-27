const initialState = {
  category: "",
  title: "",
  problem: null,
  reflink: "",
  photo: null,
};

const SET_CAT = "SET_CATEGORY_STATE";
const SET_TITLE = "SET_TITLE_STATE";
const SET_PROB = "SET_PROBLEM_STATE";
const SET_REFLINK = "SET_REFLINK_STATE";
const SET_PHOTO = "SET_PHOTO_STATE";

const rootReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_CAT:
      return { ...state, category: action.payload };
    case SET_TITLE:
      return { ...state, title: action.payload };
    case SET_PROB:
      return { ...state, problem: action.payload };
    case SET_REFLINK:
      return { ...state, reflink: action.payload };
    case SET_PHOTO:
      return { ...state, photo: action.payload };
    default:
      return state;
  }
};
export default rootReducer;
