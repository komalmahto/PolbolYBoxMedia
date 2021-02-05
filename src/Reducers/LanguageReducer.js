import { GET_LANGUAGE} from '../Actions/Types';
let lang=JSON.parse(localStorage.getItem('language'))
console.log(lang,"language");
if(lang===null){
  localStorage.setItem("language",JSON.stringify(true))
  lang=JSON.parse(localStorage.getItem('language'))
}

const initialState = {
  english: lang,
};


export default function reduce(state = initialState, action) {
  const { type, payload } = action;
  // localStorage.setItem('language',payload)
  switch (type) {
    case GET_LANGUAGE:
      state.english = payload;
      return state;
  
    default:
      return state;
  }
}
