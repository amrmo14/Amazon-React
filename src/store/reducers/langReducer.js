let INITIAL_STATE = {
  lang: "en",
};
const langReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LANG":
      return { lang: action.payload };
    default:
      return state;
  }
};

export default langReducer;
