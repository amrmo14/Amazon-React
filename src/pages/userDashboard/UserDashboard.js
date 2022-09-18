import React from "react";
import { useSelector } from "react-redux";
import LocalizedStrings from "react-localization";
import "./userDashboard.css";
import { userLogout } from "../../firebase/users/users";
import { useHistory } from "react-router-dom";
export default function UserDashboard() {
  let history = useHistory();
  let lang = useSelector((state) => state.lang.lang);
  let pageData = new LocalizedStrings({
    en: {
      logout: "Logout",
      purchase: "My Purchase",
    },
    ar: {
      logout: "تسجيل الخروج",
      purchase: "مشترياتي",
    },
  });
  let handleLogout = () => {
    localStorage.removeItem("amazon_user");
    userLogout().then(() => {
      history.push("/");
      window.location.reload(true);
    });
  };
  pageData.setLanguage(lang);
  return (
    <div
      className={`user ${lang == "en" ? "en" : "ar"}`}
      dir={lang == "en" ? "ltr" : "rtl"}
    >
      <div className="row">
        <div className="col-md-6 user__left">
          <div className="user__left-options">
            <button
              className="primaryBtn customBtn"
              onClick={() => {
                history.push("/purchase");
              }}
            >
              {pageData.purchase}
            </button>
            <button className="primaryBtn customBtn" onClick={handleLogout}>
              {pageData.logout}
            </button>
          </div>
        </div>
        <div className="col-md-6 user__right">
          <div className="user__right-imgBox">
            <img
              src={require("./../../assets/seller_dashboard/dashboard.png")}
              alt="user dashboard image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
