let INITIAL_STATE = false;

function toggleSidebarReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_SIDEBAR":
      return action.payload;
    default:
      return state;
  }
}

export default toggleSidebarReducer;
