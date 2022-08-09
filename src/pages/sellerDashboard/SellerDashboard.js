import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import LocalizedStrings from "react-localization";
import { Link } from "react-router-dom";
import { logout } from "../../firebase/seller/sellers";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import logging from "../../store/actions/logging";
import { getSeller } from "./../../firebase/seller/sellers";
import "./sellerDashboard.css";
export default function SellerDashboard() {
  let lang = useSelector((state) => state.lang.lang);
  let history = useHistory();
  let [permission, setPermission] = useState("");
  let pageDate = new LocalizedStrings({
    en: {
      profile: "Manage Profile",
      products: "Manage Products",
      purchases: "Manage Purshaces",
      logout: "Logout",
      permission:
        "Your request is under revision, Please wait an email form us soon .",
    },
    ar: {
      profile: "ادارة الملف الشخصي",
      products: "ادارة المنتجات",
      purchases: "ادارة المشتريات",
      logout: "تسجيل الخروج",
      permission:
        "طلبك تحت المراجعة , برجاء انتظار بريد الكتروني منا في اقرب وقت",
    },
  });
  pageDate.setLanguage(lang);
  let dispatch = useDispatch();
  let handleLogout = () => {
    logout().then(() => {
      dispatch(logging(false));
      history.push("/");
    });
  };
  useEffect(() => {
    getSeller(localStorage.getItem("userId")).then((user) => {
      setPermission(user.permission);
    });
  }, []);
  return (
    <>
      <div
        className={`row sellerDashboard ${
          lang == "en" ? "dashboard__en" : "dashboard__ar"
        }`}
        dir={lang == "en" ? "ltr" : "rtl"}
      >
        <div className="col-md-6 dashboard__left d-flex flex-column align-items-center">
          <img
            src={require("./../../assets/amazon_desk.png")}
            className="w-25"
          />
          <div className="customBtnGroup  w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <Link to="/accountInfo" className="dashboard__left-link">
              <button className="dashboard__left-btn">
                {pageDate.profile}
              </button>
            </Link>
            {permission && localStorage.getItem("role") == "seller" && (
              <Link
                to={`/${localStorage.getItem("userId")}/productsDashboard`}
                className="dashboard__left-link"
              >
                <button className="dashboard__left-btn">
                  {pageDate.products}
                </button>
              </Link>
            )}

            <Link to="" className="dashboard__left-link">
              <button className="dashboard__left-btn">
                {pageDate.purchases}
              </button>
            </Link>
            <button
              className="dashboard__left-btn"
              onClick={() => handleLogout()}
            >
              {pageDate.logout}
            </button>
            {!permission && (
              <p className="text-danger fs-3 mt-5">{pageDate.permission}</p>
            )}
          </div>
        </div>
        <div className="col-md-6 dashboard__right ">
          <img src={require("./../../assets/seller_dashboard/dashboard.png")} />
        </div>
      </div>
    </>
  );
}
