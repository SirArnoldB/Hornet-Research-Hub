const setUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };
};

const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
    payload: null,
  };
};

export { setUser, logoutUser };
