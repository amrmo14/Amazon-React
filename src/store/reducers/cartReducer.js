let INITIAL_STATE = [];
let cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CART":
      return [...state, action.payload];
    default:
      return state;
  }
};
export default cartReducer;
