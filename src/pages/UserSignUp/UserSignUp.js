import React, { useState } from "react";
import LocalizedStrings from "react-localization";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { addSeller } from "../../firebase/seller/sellers";
import { useHistory } from "react-router-dom";
import "./../seller_signup/sellerSignUp.css";
import { signin } from "../../firebase/users/users";
export default function UserSignUp() {
  let history = useHistory();
  //HANDLE: localization
  let lang = useSelector((state) => state.lang.lang);
  let pageData = new LocalizedStrings({
    en: {
      name: "Name",
      phone: "Phone",
      email: "Email",
      password: "Password",
      confrimPassword: "Confirm Password",
      address: "Address",
      signup: "Signup now",
      nameReq: "*Name is required!",
      emailReq: "*Email is required!",
      passwordReq: "*Password is required!",
      passwordLen: "Pasword should be at least 10 char",
      confirmPasswordReq: "*Confirm Password is required!",
      confirmPasswordValidate: "Passwords should be the same",
      phoneReq: "*Phone is required!",
      phoneLen: "Phone number should be 11 number",
      addressReq: "*Address is required!",
      addressLen: "*Address is too short!",
      wait: "Please Wait ..",
      success: "Congrats, Now you have an account",
      failed: "Failed, PLease try again",
    },
    ar: {
      name: "الاسم",
      phone: "الهاتف",
      email: "البريد الالكتروني",
      password: "كلمة المرور",
      passwordLen: "كلمة المرور يجب ان تتكون من 10 حروف علي الاقل",
      confrimPassword: "تأكيد كلمة المرور",
      address: "العنوان",
      signup: "إنشاء حساب الان",
      nameReq: "*اسم البائع غير موجود",
      emailReq: "*الايميل الخاص بالبائع غير موجود",
      passwordReq: "*كلمة السر غير موجوده",
      confirmPasswordReq: "*كلمه السر غير موجوده",
      confirmPasswordValidate: "كلمتا السر غير متطابقتين",
      phoneReq: "*رقم الهاتف غير موجود",
      phoneLen: "رقم الهاتف يجب ان يتكون من 11 رقم",
      addressReq: "*العنوان غير موجود",
      addressLen: "*العنوان قصير للغاية",
      wait: "من فضلك انتظر ..",
      success: "تهانينا , لقد تم انشاء الحساب",
      failed: "فشلت العملية ,برجاء المحاولة مره اخري",
    },
  });
  pageData.setLanguage(lang);
  //HANDLE: validate
  let validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = pageData.nameReq;
    }
    if (!values.email) {
      errors.email = pageData.emailReq;
    }
    if (!values.password) {
      errors.password = pageData.passwordReq;
    }
    if (values.password.length < 10) {
      errors.password = pageData.passwordLen;
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = pageData.confirmPasswordReq;
    }
    if (!values.address) {
      errors.address = pageData.addressReq;
    }
    if (!values.phone) {
      errors.phone = pageData.phoneReq;
    }
    if (values.phone.length != 11 || isNaN(values.phone)) {
      errors.phone = pageData.phoneLen;
    }
    if (values.address.length < 12) {
      errors.address = pageData.addressLen;
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = pageData.confirmPasswordValidate;
    }
    return errors;
  };
  //HANDLE: Formik
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
    },
    validate,
    onSubmit: (values) => {
      setProcess(pageData.wait);
      signin(values)
        .then((data) => {
          console.log(data);
          setProcess(pageData.success);
          setTimeout(() => {
            formik.resetForm();
            setProcess("");
            history.push("/sellerLogin");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          setProcess(pageData.failed + err.message);
          setTimeout(() => {
            setProcess("");
          }, 3000);
        });
    },
  });
  //HANDLE: process State
  let [process, setProcess] = useState("");
  return (
    <>
      <div
        className={`row seller__signup ${
          lang == "en" ? "signup__en" : "signup__ar"
        }`}
        dir={lang == "en" ? "ltr" : "rtl"}
      >
        <div className="col-md-6 signup__left d-flex flex-column align-items-center justify-content-start">
          <img src={require("./../../assets/amazon_desk.png")} />
          <form
            className="align-self-start mx-4 w-100 px-5"
            onSubmit={(e) => {
              e.preventDefault();
              return formik.handleSubmit();
            }}
          >
            <div className="mb-3">
              <label className="form-label fs-3">{pageData.name}</label>
              <input
                type="text"
                className="form-control w-100 fs-4 py-2 px-4"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && (
                <small className="fs-4 text-danger mt-2 d-block">
                  {formik.errors.name}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fs-3">{pageData.email}</label>
              <input
                type="email"
                className="form-control w-100 fs-4 py-2 px-4"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <small className="fs-4 text-danger mt-2 d-block">
                  {formik.errors.email}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fs-3">{pageData.password}</label>
              <input
                type="password"
                className="form-control w-100 fs-4 py-2 px-4"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <small className="fs-4 text-danger mt-2 d-block">
                  {formik.errors.password}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fs-3">
                {pageData.confrimPassword}
              </label>
              <input
                type="password"
                className="form-control w-100 fs-4 py-2 px-4"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              {formik.errors.confirmPassword && (
                <small className="fs-4 text-danger mt-2 d-block">
                  {formik.errors.confirmPassword}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fs-3">{pageData.phone}</label>
              <input
                type="text"
                className="form-control w-100 fs-4 py-2 px-4"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.errors.phone && (
                <small className="fs-4 text-danger mt-2 d-block">
                  {formik.errors.phone}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fs-3">{pageData.address}</label>
              <input
                type="text"
                className="form-control w-100 fs-4 py-2 px-4"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {formik.errors.address && (
                <small className="fs-4 text-danger mt-2 d-block">
                  {formik.errors.address}
                </small>
              )}
            </div>
            <button
              className="customBtn btn btn-primary py-1 px-5 fs-3 mt-5"
              disabled={Object.keys(formik.errors).length > 0 ? true : false}
            >
              {pageData.signup}
            </button>
            {process && (
              <div className="alert alert-primary fs-4">{process}</div>
            )}
          </form>
        </div>
        <div className="col-md-6 signup__right d-flex justify-content-center align-items-center">
          <img src={require("./../../assets/seller_signup/signup.png")} />
        </div>
      </div>
    </>
  );
}
