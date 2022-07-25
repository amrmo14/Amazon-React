let INITIAL_STATE = {
  isOpen: false,
  items: [],
};
const NestedSidebarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_NESTED_SIDEBAR":
      return { isOpen: action.payload.isOpen, items: action.payload.items };
    default:
      return state;
  }
};

export default NestedSidebarReducer;
