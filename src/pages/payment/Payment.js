import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import LocalizedStrings from "react-localization";
import "./payment.css";
import { useFormik } from "formik";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getProductById } from "../../firebase/products/products";
import { getUserById, updateUserPurshase } from "../../firebase/users/users";
export default function Payment() {
  let lang = useSelector((state) => state.lang.lang);
  let [error, setError] = useState("");
  let [paymentState, setPaymentState] = useState("");
  let [productPrice, setProductPrice] = useState(0);
  let [user, setUser] = useState({});
  let params = useParams();
  let location = useLocation();
  let prodId = params.id;
  let quantity = location.search.split("=")[1];
  let stripe = useStripe();
  let element = useElements();
  useEffect(() => {
    if (localStorage.getItem("amazon_user")) {
      getUserById(localStorage.getItem("amazon_user")).then((data) => {
        setUser(data);
      });
    }
    getProductById(prodId).then((data) => {
      setProductPrice(data.Price);
    });
  }, []);
  // HANDLE: card value cahnge
  let handleCardChange = (e) => {
    if (!e.complete) {
      setError(formStrings.cardError);
    } else {
      setError("");
    }
  };
  // ---------------------------------------------
  // HANDLE: localization
  let formStrings = new LocalizedStrings({
    en: {
      title: "Payment Processing",
      name: "Name",
      address: "Address",
      phone: "Phone",
      email: "Email",
      buy: "Buy Now",
      nameLenError: "Name Too Short!",
      nameRequiredError: "Name is Required!",
      addressLenError: "Address Is Too Short!",
      addressRequiredError: "Address Is Required!",
      phoneLenError: "Phone Should be 11 numbers!",
      phoneRequiredError: "Phone Is Too Short!",
      phoneTypeError: "Phone should be numbers only!",
      emailRequiredError: "Email is Required",
      emailValidError: "Invalid Email",
      processing: "Processing..",
      failed: "Failed,Please try again",
      success: "Processing is done, congratulation!",
      cardError: "You should enter card id!",
      card: "Payment Card",
    },
    ar: {
      title: "عملية الشراء",
      name: "الاسم",
      address: "العنوان",
      phone: "رقم الهاتف",
      email: "البريد الالكتروني",
      buy: "شراء الان",
      nameLenError: "الاسم غير كافي, يرجي كتابة الاسم كاملا!",
      nameRequiredError: "اسم المستخدم غير متواجد",
      addressLenError: "العنوان غير كافي, يرجي كتابة العنوان كاملا!",
      addressRequiredError: "عنوان المستخدم غير متواجد",
      phoneLenError: "يجب ان يكون رقم الهاتف 11 رقم",
      phoneRequiredError: "رقم هاتف المستخدم غير متواجد",
      phoneTypeError: "يجب الا يحتوي رقم الهاتف علي اية رموز",
      emailRequiredError: "البريد الالكتورني للمستخدم غير متواجد",
      emailValidError: "البريد الالكتروني غير صحيح",
      processing: "جاري الشراء ..",
      failed: "فشلت العملية , برجاء المحاولة مره اخري",
      success: "انتهت عملية الشراء , تهانينا!",
      cardError: "يجب عليك ادخال رقم الكارت!",
      card: "كارت الدفع",
    },
  });
  formStrings.setLanguage(lang);
  // ---------------------------------------------
  // HANDLE: formik
  let validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = formStrings.nameRequiredError;
    } else if (values.name.length < 15) {
      errors.name = formStrings.nameLenError;
    }
    if (!values.address) {
      errors.address = formStrings.addressRequiredError;
    } else if (values.address.length < 15) {
      errors.address = formStrings.addressLenError;
    }
    if (!values.phone) {
      errors.phone = formStrings.phoneRequiredError;
    } else if (values.phone.length !== 11) {
      errors.phone = formStrings.phoneLenError;
    } else if (isNaN(values.phone)) {
      errors.phone = formStrings.phoneTypeError;
    }
    if (!values.email) {
      errors.email = formStrings.emailRequiredError;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = formStrings.emailValidError;
    }
    console.log(formik.errors);
    return errors;
  };
  let formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
    },
    validate,
    //HANDLE: Payment process
    onSubmit: async (values) => {
      setPaymentState(formStrings.processing);
      console.log(formik);
      //1) Gathering data
      let cardElement = element.getElement("card");
      // console.log(cardElement);
      let { name, address, phone, email } = values;
      let billing_info = {
        name,
        phone,
        email,
        address: {
          line1: address,
        },
      };
      try {
        //2) handle payment intent with static amount
        let paymentIntent = await axios.post("http://localhost:5000/payments", {
          amount: productPrice * quantity * 100,
        });
        //3) handle payment method
        let paymentMethodObj = stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: billing_info,
        });
        //4)handle confirm the payment
        let paymentConfirm = await stripe.confirmCardPayment(
          paymentIntent.data,
          {
            payment_method: (await paymentMethodObj).paymentMethod.id,
          }
        );
        if (paymentConfirm.error) {
          setError(paymentConfirm.error.message);
          setPaymentState(formStrings.failed);
          return;
        }
        updateUserPurshase(localStorage.getItem("amazon_user"), prodId);
        setPaymentState(formStrings.success);
        setTimeout(() => {
          setPaymentState("");
          formik.values.name = "";
          formik.values.address = "";
          formik.values.phone = "";
          formik.values.email = "";
        }, 3000);
      } catch (err) {
        console.log("Error ******************** ", err);
        setError(err.message);
        setPaymentState(formStrings.failed);
        setTimeout(() => {
          setPaymentState("");
        }, 3000);
      }
    },
  });
  // ---------------------------------------------
  return (
    <div
      className={`purchase  ${
        lang == "en" ? "purchase__txt-en" : "purchase__txt-ar"
      }`}
      dir={lang == "en" ? "ltr" : "rtl"}
    >
      <div className="row">
        <div className="col-md-6 purchase__left order-md-1 order-2">
          <h2 className="payment__title">{formStrings.title}</h2>
          <form
            className="my-5"
            onSubmit={(e) => {
              e.preventDefault();
              return formik.handleSubmit();
            }}
          >
            <div className="mb-4">
              <label htmlFor="name" className="purchase__form-label">
                {formStrings.name}
              </label>
              <input
                type="text"
                id="name"
                className="form-control w-75 purchase__form-input"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
              />
              {formik.errors.name && (
                <small className="text-danger fs-5 d-block my-2">
                  *{formik.errors.name}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="purchase__form-label">
                {formStrings.address}
              </label>
              <input
                type="text"
                id="address"
                className="form-control w-75 purchase__form-input"
                value={formik.values.address}
                onChange={formik.handleChange("address")}
              />
              {formik.errors.address && (
                <small className="text-danger fs-5 d-block my-2">
                  *{formik.errors.address}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="purchase__form-label">
                {formStrings.phone}
              </label>
              <input
                type="text"
                id="phone"
                className="form-control w-75 purchase__form-input"
                value={formik.values.phone}
                onChange={formik.handleChange("phone")}
              />
              {formik.errors.phone && (
                <small className="text-danger fs-5 d-block my-2">
                  *{formik.errors.phone}
                </small>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="purchase__form-label">
                {formStrings.email}
              </label>
              <input
                type="email"
                id="email"
                className="form-control w-75 purchase__form-input"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
              />
              {formik.errors.email && (
                <small className="text-danger fs-5 d-block my-2">
                  *{formik.errors.email}
                </small>
              )}
            </div>
            <div className="mb-4 w-75  ">
              <label htmlFor="email" className="purchase__form-label mb-4">
                {formStrings.card}
              </label>
              <CardElement
                onChange={(e) => handleCardChange(e)}
                options={{
                  hidePostalCode: true,
                  style: {
                    base: {
                      fontSize: "16px",
                    },
                  },
                }}
              />
            </div>
            {error && (
              <small className="text-danger fs-5 d-block">*{error}</small>
            )}

            <div className="mt-5">
              <button
                type="submit"
                className="btn btn-primary fs-4 py-2 px-5 primaryBtn"
                disabled={Object.keys(formik.errors).length || error}
              >
                {formStrings.buy}
              </button>
              {paymentState && (
                <div
                  className="alert alert-primary fs-5 w-75 mt-3"
                  role="alert"
                >
                  {paymentState}
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="col-md-6 purchase__right order-md-2 order-1 d-flex jusityf-content-center align-items-center">
          <img
            src={require("./../../assets/payment/payment3.png")}
            className="purchase__right-img"
          />
        </div>
      </div>
    </div>
  );
}
