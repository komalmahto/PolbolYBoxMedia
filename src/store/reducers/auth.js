// import {} from './'

const initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,
  isAuthenticated: false,
  user: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "HELLO":
      return {};
    default:
      return state;
  }
}
