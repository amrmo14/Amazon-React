import React, { useState } from "react";
import LocalizedStrings from "react-localization";
import { useSelector } from "react-redux/es/exports";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { login } from "../../firebase/seller/sellers";
import { useHistory } from "react-router-dom";
import logging from "../../store/actions/logging";
import { useDispatch } from "react-redux/es/exports";
import "./sellerLogin.css";
export default function SellerLogin() {
  let [process, setProcess] = useState("");
  let lang = useSelector((state) => state.lang.lang);
  let IS_LOGGED = useSelector((state) => state.isLogged);
  let dispatch = useDispatch();
  let history = useHistory();
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
      emailReq: "Email is required!",
      passwordReq: "Password is required!",
      wait: "Please Wait ..",
      failed: "Login failed, Please try again",
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
      emailReq: "البريد الالكتروني غير موجود!",
      passwordReq: "كلمة السر غير موجودة !",
      wait: "من فضلك انتظر",
      failed: "فشلت عملية تسجيل الدخول , برجاء المحاولة مره اخري",
    },
  });
  pageData.setLanguage(lang);

  let validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = pageData.emailReq;
    }
    if (!values.password) {
      errors.password = pageData.passwordReq;
    }
    return errors;
  };
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      setProcess(pageData.wait);
      login(values.email, values.password)
        .then((data) => {
          console.log(data);
          setProcess("");
          dispatch(logging(true));
          setTimeout(() => {
            history.push("/sellerDashboard");
          }, 2000);
        })
        .catch((err) => {
          setProcess(pageData.failed + err);
        });
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
            <form
              className="w-100 align-self-start"
              onSubmit={(e) => {
                e.preventDefault();
                return formik.handleSubmit();
              }}
            >
              <div className="mb-4">
                <label className="form-label fs-3">{pageData.email}</label>
                <input
                  type="email"
                  className="form-control py-2 px-3 fs-4"
                  value={formik.values.email}
                  name="email"
                  onChange={formik.handleChange}
                />
                {formik.errors.email && (
                  <small className="fs-4 text-danger mt-2 d-block">
                    {formik.errors.email}
                  </small>
                )}
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
                {formik.errors.password && (
                  <small className="fs-4 text-danger mt-2 d-block">
                    {formik.errors.password}
                  </small>
                )}
              </div>
              <button className="btn btn-primary customBtn py-2 px-5 fs-5 mt-5 ">
                {pageData.login}
              </button>
            </form>
            <div className="align-self-start">
              <div className="my-2">
                <p className="fs-4 d-inline-block">{pageData.signUpQuestion}</p>
                <Link to="/sellerSignup" className="login__link mx-3">
                  <span className="fs-5">{pageData.signUp}</span>
                </Link>
              </div>
              {process && (
                <div className="alert alert-primary fs-4">{process}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
