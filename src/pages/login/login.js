import React from "react";
import LocalizedStrings from "react-localization";
import { useSelector } from "react-redux/es/exports";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import "./login.css";
export default function Login() {
  let lang = useSelector((state) => state.lang.lang);
  let pageData = new LocalizedStrings({
    en: {
      title: "Login",
      email: "Email",
      password: "Password",
      sellerQuestion: "Are you a seller?",
      loginHere: "Login Here",
      login: "Login Now",
      signUpQuestion: "Don't have an account ?",
      signUp: "Signup now",
    },
    ar: {
      title: "تسجيل الدخول",
      email: "البريد الالكتروني",
      password: "كلمة المرور",
      sellerQuestion: "هل انت بائع؟",
      loginHere: "تسجيل الدخول من هنا",
      login: "تسجيل الدخول الان",
      signUpQuestion: "ليس لديك حساب ؟",
      signUp: "قم بإنشاء حساب الان",
    },
  });
  pageData.setLanguage(lang);
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  });
  return (
    <>
      <div
        className={`row ${lang == "en" ? "login__en" : "login__ar"}`}
        dir={lang == "en" ? "ltr" : "rtl"}
      >
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <div className="login__box d-flex flex-column align-items-center">
            <img src={require("./../../assets/amazon_desk.png")} />
            <h2>{pageData.title}</h2>
            <form className="w-100 align-self-start">
              <div className="mb-4">
                <label className="form-label fs-3">{pageData.email}</label>
                <input
                  type="email"
                  className="form-control py-2 px-3 fs-4"
                  value={formik.values.email}
                  name="email"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="form-label fs-3">{pageData.password}</label>
                <input
                  type="password"
                  className="form-control py-2 px-3 fs-4"
                  value={formik.values.password}
                  name="password"
                  onChange={formik.handleChange}
                />
              </div>
              <button className="btn btn-primary customBtn py-2 px-5 fs-5 mt-5 ">
                {pageData.login}
              </button>
            </form>
            <div className="align-self-start">
              <div className="my-2">
                <p className="fs-4 d-inline-block">{pageData.sellerQuestion}</p>
                <Link to="/sellerLogin" className="login__link mx-3">
                  <span className="fs-5">{pageData.loginHere}</span>
                </Link>
              </div>
              <div className="my-2">
                <p className="fs-4 d-inline-block">{pageData.signUpQuestion}</p>
                <Link to="/sellerLogin" className="login__link mx-3">
                  <span className="fs-5">{pageData.signUp}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
