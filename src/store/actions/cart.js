let cart = (state) => {
  return {
    type: "SET_CART",
    payload: state,
  };
};
export let deleteProduct = (state) => {
  return {
    type: "DELETE_PRODUCT",
    payload: state,
  };
};

export default cart;
