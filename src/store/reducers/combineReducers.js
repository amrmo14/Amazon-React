import { combineReducers } from "redux";
import toggleSidebarReducer from "./toggleSidebarReducer";
import toggleSidebarOverlayReducer from "./toggleSidebarOverlayReducer";
import NestedSidebarReducer from "./toggleNestedSidebarReducer";
import langReducer from "./langReducer";
import cartReducer from "./cartReducer";
import logReducer from "./logReducer";
export default combineReducers({
  toggleSidebar: toggleSidebarReducer,
  toggleSidebarOverlay: toggleSidebarOverlayReducer,
  toggleNestedSidebar: NestedSidebarReducer,
  lang: langReducer,
  cart: cartReducer,
  isLogged: logReducer,
});
// export default combine;
