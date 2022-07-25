const toggleSidebarOverlay = (state) => {
  return {
    type: "SET_SIDEBAR_OVERLAY",
    payload: state,
  };
};
export default toggleSidebarOverlay;
