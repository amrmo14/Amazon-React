import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LocalizedStrings from "react-localization";
import { getSeller, resetPassword } from "../../firebase/seller/sellers";
import { Link } from "react-router-dom";
import "./accountInfo.css";
import { useFormik } from "formik";
export default function AccountInfo() {
  let lang = useSelector((state) => state.lang.lang);
  let pageData = new LocalizedStrings({
    en: {
      name: "Name",
      email: "Email",
      address: "Address",
      phone: "Phone",
      back: "Back",
      save: "Save",
      resetPassword: "Reset Password",
      password: "Enter Password",
      confirmPassword: "Confirm Password",
      passwordRed: "Password is required",
      confirmPasswordReq: "Confirm the password",
      confirmPasswordValidate: "Passwords should be the same",
      wait: "Please Wait",
      success: "Password updated",
      failed: "Failed, please try again",
    },
    ar: {
      name: "اسم المستخدم",
      email: "البريد الالكتروني",
      address: "العنوان",
      phone: "رقم الهاتف",
      save: "حفظ",
      back: "الرجوع للرئيسية",
      resetPassword: "تغيير كلمة المرور",
      password: "ادخل كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      passwordRed: "كلمة المرور غير موجودة!",
      confirmPasswordReq: "تأكيد كلمة المرور ",
      confirmPasswordValidate: "يجب ان تتطابق كلمة المرور",
      wait: "من فضلك انتظر",
      success: "تم تغيير كلمة المرور",
      failed: "فشلت العملية, حاول مرة اخري",
    },
  });
  pageData.setLanguage(lang);
  let [seller, setSeller] = useState({});
  let [isUpdate, setIsUpdate] = useState(false);
  let [process, setProcess] = useState("");
  let validate = (values) => {
    let errors = {};
    if (!values.password) {
      errors.password = pageData.passwordRed;
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = pageData.confirmPasswordReq;
    }
    if (values.password != values.confirmPassword) {
      errors.confirmPassword = pageData.confirmPasswordValidate;
    }
    return errors;
  };
  let formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      setProcess(pageData.wait);
      resetPassword(localStorage.getItem("userId"), values.password)
        .then((data) => {
          setProcess(pageData.success);
          // formik.resetForm();
          console.log(data);
          console.log("Password update");
          setTimeout(() => {
            setProcess("");
            formik.resetForm();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setProcess(pageData.failed, err);
          setTimeout(() => {
            setProcess("");
          }, 2000);
        });
    },
  });
  useEffect(() => {
    getSeller(localStorage.getItem("userId")).then((data) => {
      console.log(data);
      setSeller(data);
    });
  }, []);
  let handleResetBtn = () => {
    setIsUpdate(true);
  };
  // let handleSave = (newPassword) => {};
  return (
    <>
      <div
        className={`row accountInfo ${
          lang == "en" ? "dashboard__en" : "dashboard__ar"
        }`}
        dir={lang == "en" ? "ltr" : "rtl"}
      >
        <div className="col-md-6 accountInfo__left d-flex flex-column align-items-center">
          <img
            src={require("./../../assets/amazon_desk.png")}
            className="w-25"
          />

          {seller && (
            <div className="align-self-start px-5">
              <div className="mb-5">
                <p className="mb-1 fw-light fs-5">{pageData.name}</p>
                <h4 className="fs-3 fw-bold">{seller.name}</h4>
              </div>
              <div className="mb-5">
                <p className="mb-1 fw-light fs-5">{pageData.email}</p>
                <h4 className="fs-3 fw-bold">{seller.email}</h4>
              </div>
              <div className="mb-5">
                <p className="mb-1 fw-light fs-5">{pageData.address}</p>
                <h4 className="fs-3 fw-bold">
                  {seller.address?.country} {seller.address?.city}{" "}
                  {seller.address?.street}
                </h4>
              </div>
              <div className="mb-5">
                <p className="mb-1 fw-light fs-5">{pageData.phone}</p>
                <h4 className="fs-3 fw-bold">{seller.phone}</h4>
              </div>
              {isUpdate && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    return formik.handleSubmit();
                  }}
                >
                  <div className="mb-4">
                    <input
                      type="passowrd"
                      placeholder={`${pageData.password}`}
                      className="w-100 fs-4 form-control "
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.password && (
                      <small className="text-danger fs-4 d-block mt-1">
                        {formik.errors.password}
                      </small>
                    )}
                  </div>

                  <div className="mb-4">
                    <input
                      type="passowrd"
                      placeholder={`${pageData.confirmPassword}`}
                      className="w-100 fs-4 form-control "
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.confirmPassword && (
                      <small className="text-danger fs-4 d-block mt-1">
                        {formik.errors.confirmPassword}
                      </small>
                    )}
                  </div>
                  <button
                    className="btn btn-danger py-1 px-3 fs-4 mx-2 my-2"
                    type="submit"
                    // onClick={() => handleSave(formik.values.password)}
                    disabled={!formik.isValid}
                  >
                    {pageData.save}
                  </button>
                </form>
              )}
              <div className="group-btn">
                <button className="btn btn-secondary py-1 px-3 fs-4 mx-2">
                  <Link to="/" className="text-light text-decoration-none">
                    {pageData.back}
                  </Link>
                </button>

                <button
                  className="btn btn-primary py-1 px-5 fs-4 mx-2"
                  onClick={() => handleResetBtn()}
                >
                  {pageData.resetPassword}
                </button>
              </div>
              {process && (
                <div className="alert alert-primary fs-4 mt-5">{process}</div>
              )}
            </div>
          )}
        </div>
        <div className="col-md-6 accountInfo__right">
          <img
            src={require("./../../assets/accountInfo.png")}
            className="w-75"
          />
        </div>
      </div>
    </>
  );
}
