const initialState = {
  category: "",
  title: "",
  problem: null,
  reflink: "",
  photo: null,
  description:"",
  expectedSignatures:0,
  lifespan:""

};

const SET_CAT = "SET_CATEGORY_STATE";
const SET_TITLE = "SET_TITLE_STATE";
const SET_PROB = "SET_PROBLEM_STATE";
const SET_REFLINK = "SET_REFLINK_STATE";
const SET_PHOTO = "SET_PHOTO_STATE";
const SET_DESC = "SET_DESC_STATE";
const SET_EXPECTEDSIGN = "SET_EXPECTEDSIGN_STATE";
const SET_LIFESPAN = "SET_LIFESPAN_STATE";

const petitionReducer = (state = initialState, action) => {
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
      case SET_DESC:
      return { ...state, desc: action.payload };
      case SET_EXPECTEDSIGN:
      return { ...state, expectedSignatures: action.payload };
      case SET_LIFESPAN:
      return { ...state, lifespan: action.payload };
    default:
      return state;
  }
};
export default petitionReducer;
