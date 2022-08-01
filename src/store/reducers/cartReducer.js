let INITIAL_STATE = [];
let cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CART":
      return [...state, action.payload];
    case "DELETE_PRODUCT":
      let index = state.findIndex(
        (product) => product.product.en.id == action.payload
      );
      state.splice(index, 1);
      return state;
    default:
      return state;
  }
};
export default cartReducer;
