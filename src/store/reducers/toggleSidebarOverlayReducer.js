const INITIAL_STATE = true;
const toggleSidebarOverlayReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_SIDEBAR_OVERLAY":
      return action.payload;
    default:
      return state;
  }
};
export default toggleSidebarOverlayReducer;
