let INITIAL_STATE = false;
let loggingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LOGGING":
      return action.payload;
    default:
      return state;
  }
};
export default loggingReducer;
