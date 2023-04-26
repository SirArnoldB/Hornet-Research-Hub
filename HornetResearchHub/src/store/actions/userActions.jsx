const setUser = (user) => {
  return (dispatch) => {
    console.log("Dispatching setUser action");
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };
};

export { setUser };
