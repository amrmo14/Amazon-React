// import { useSelector } from "react-redux/es/exports";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
export default function RedirectWrapper(props) {
  let IS_LOGGED = useSelector((state) => state.isLogged);
  console.log(IS_LOGGED);

  return localStorage.getItem("token") ||
    localStorage.getItem("amazon_user") ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
}
