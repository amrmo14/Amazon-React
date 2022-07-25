import { combineReducers } from "redux";
import toggleSidebarReducer from "./toggleSidebarReducer";
import toggleSidebarOverlayReducer from "./toggleSidebarOverlayReducer";
import NestedSidebarReducer from "./toggleNestedSidebarReducer";
import langReducer from "./langReducer";
import cartReducer from "./cartReducer";
export default combineReducers({
  toggleSidebar: toggleSidebarReducer,
  toggleSidebarOverlay: toggleSidebarOverlayReducer,
  toggleNestedSidebar: NestedSidebarReducer,
  lang: langReducer,
  cart: cartReducer,
});
// export default combine;
