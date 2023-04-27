const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  console.log("Current state:", state);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
