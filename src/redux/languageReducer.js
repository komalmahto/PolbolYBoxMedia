let language = JSON.parse(localStorage.getItem('polbolLanguage'))

const initialState = {
    language:language||"English"
  };
  
  const SET_LANG = "SET_LANGUAGE"
  
  const languageReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    const { type, payload } = action;

    switch (type) {
      case SET_LANG:
        const lstate={ ...state, language:payload }
        localStorage.setItem('polbolLanguage', JSON.stringify(payload));
        return lstate;
      default:
        return state;
    }
  };
  export default languageReducer;
  