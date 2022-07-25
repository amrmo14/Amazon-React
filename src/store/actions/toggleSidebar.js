const toggleSidebar = (state) => {
  return {
    type: "SET_SIDEBAR",
    payload: state,
  };
};
export default toggleSidebar;
