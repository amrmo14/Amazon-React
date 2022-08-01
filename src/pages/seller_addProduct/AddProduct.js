import React from "react";
import { useFormik } from "formik";
import LocalizedStrings from "react-localization";
import { useSelector } from "react-redux";
import "./addProduct.css";
export default function AddProduct() {
  let validate = (values) => {
    let errors = {};
    if (!values.en.name) {
      errors.name_en = "Name is Required";
    } else if (values.en.name.length < 10) {
      errors.name_en = "Name Is Too Short !";
    }
    if (!values.ar.name) {
      errors.name_ar = "اسم المنتج غير موجود!";
    } else if (values.ar.name.length < 10) {
      errors.name_ar = "أسم المنتج غير كافي!";
    }
    if (!values.en.price) {
      errors.price_en = "Price is required";
    }
    if (!values.ar.price) {
      errors.price_ar = "سعر المنتج غير موجود";
    }
    if (!values.en.brand) {
      errors.brand_en = "Brand is required";
    }
    if (!values.ar.brand) {
      errors.brand_ar = "البراند الخاص بالمنتج غير موجود";
    }
    if (values.en.imgs.length == 0) {
      errors.imgs_en = "Product must has at least 1 photo";
    }
    if (values.ar.imgs.length == 0) {
      errors.imgs_ar = "المنتج يجب ان يحتوي علي صور علي الاقل";
    }
    if (values.ar.imgs.length != values.en.imgs.length) {
      errors.imgs_ar = "عدد الصور لايتطابق مع عدد صور المنتج باللغه الانجليزية";
    }
    if (values.ar.properities.length != values.en.properities.length) {
      errors.properities_ar =
        "عدد الخصائص لايتطابق مع عدد خصائص المنتج باللغه الانجليزية";
    }
    console.log(formik);
    return errors;
  };
  let formik = useFormik({
    initialValues: {
      en: {
        name: "",
        brand: "",
        price: "",
        discount: 0,
        imgs: [],
        properities: [],
        seller: "",
      },
      ar: {
        name: "",
        brand: "",
        price: "",
        discount: 0,
        imgs: [],
        properities: [],
        seller: "",
      },
    },
    validate,
    onSubmit: (values) => {
      console.log(formik);
      console.log(values);
    },
  });

  let handleAddProperty = (e, formLang) => {
    if (formLang == "en") {
      formik.values.en.properities.push({ name: "", value: "" });
    } else {
      formik.values.ar.properities.push({ name: "", value: "" });
    }
  };
  let handleMoreImgs = (e, formLang) => {
    if (formLang == "en") {
      formik.values.en.imgs.push("");
    } else {
      formik.values.ar.imgs.push("");
    }
  };
  return (
    <div className={`seller_addProduct `}>
      <div className="row mt-5">
        <div className="col-md-6 english__left">
          <h3 className="seller__addProduct-title">Add New Product</h3>
          <form
            className="px-4"
            onSubmit={(e) => {
              e.preventDefault();
              return formik.handleSubmit();
            }}
          >
            <div className="mb-3">
              <label htmlFor="english_name" className="english__label">
                <span className="text-danger">*</span>Product Name
              </label>
              <input
                className="form-control seller__addProduct-input"
                type="text"
                id="english_name"
                name="en.name"
                value={formik.values.en.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name_en && (
                <small className="text-danger py-2 d-block fs-5">
                  {formik.errors.name_en}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="english__price" className="english__label">
                <span className="text-danger">*</span>Price
              </label>
              <input
                className="form-control w-25 seller__addProduct-input"
                type="number"
                id="english__price"
                value={formik.values.en.price}
                name="en.price"
                onChange={formik.handleChange}
              />
              {formik.errors.price_en && (
                <small className="text-danger py-2 d-block fs-5">
                  {formik.errors.price_en}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="english__brand" className="english__label">
                <span className="text-danger">*</span>Brand
              </label>
              <input
                className="form-control w-50 seller__addProduct-input"
                type="text"
                id="english__brand"
                value={formik.values.en.brand}
                name="en.brand"
                onChange={formik.handleChange}
              />
              {formik.errors.brand_en && (
                <small className="text-danger py-2 d-block fs-5">
                  {formik.errors.brand_en}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="english__discount" className="english__label">
                Discount
              </label>
              <input
                className="form-control w-25 seller__addProduct-input"
                type="number"
                id="english__discount"
                value={formik.values.en.discount}
                name="en.discount"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="english__discount" className="english__label">
                Product Properties
              </label>
              {formik.values.en.properities.map((property, index) => (
                <div className="d-flex mb-4">
                  <input
                    className="form-control w-25 py-3 px-4 fs-5"
                    placeholder="name"
                    value={formik.values.en.properities[index].name}
                    name={`en.properities[${index}].name`}
                    onChange={formik.handleChange}
                  />
                  <input
                    className="form-control w-75 py-3 px-4 fs-5"
                    placeholder="Value"
                    value={formik.values.en.properities[index].value}
                    name={`en.properities[${index}].value`}
                    onChange={formik.handleChange}
                  />
                </div>
              ))}
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-danger fs-5"
                  onClick={(e) => handleAddProperty(e, "en")}
                >
                  Add Property
                </button>
              </div>
            </div>
            {/* HANDLE: Images */}
            <div>
              <label htmlFor="english__images" className="english__label">
                Product Images
              </label>
              {formik.values.en.imgs.map((img, index) => (
                <input
                  className="form-control w-50 seller__addProduct-input mb-3"
                  type="file"
                  id="english__images"
                  value={formik.values.en.imgs[index]}
                  name={`en.imgs[${index}]`}
                  // onChange={(e) => handleImgs(e, "en")}
                  onChange={formik.handleChange}
                />
              ))}
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-danger fs-5"
                onClick={(e) => handleMoreImgs(e, "en")}
              >
                Add Image
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6 english__right d-flex justify-content-center align-items-center">
          <img
            src={require("./../../assets/seller_addProduct/add-en.png")}
            className="english__right-img"
          />
        </div>
      </div>
      {/* HANDLE: Arabic Section */}
      <div className="row mt-5">
        <div className="col-md-6 english__right d-flex justify-content-center align-items-center">
          <img
            src={require("./../../assets/seller_addProduct/add-ar.png")}
            className="english__right-img"
          />
        </div>
        <div className="col-md-6 english__left seller_addProduct-ar" dir="rtl">
          <h3 className="seller__addProduct-title">أضافة منتج جديد</h3>
          <form
            className="px-4"
            onSubmit={(e) => {
              e.preventDefault();
              return formik.handleSubmit();
            }}
          >
            <div className="mb-3">
              <label htmlFor="arabic_name" className="arabic__label">
                <span className="text-danger">*</span>أسم المنتج
              </label>
              <input
                className="form-control seller__addProduct-input"
                type="text"
                id="arabic_name"
                name="ar.name"
                value={formik.values.ar.name}
                onChange={formik.handleChange}
              />

              {formik.errors.name_ar && (
                <small className="text-danger py-2 d-block fs-5">
                  {formik.errors.name_ar}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="arabic__price" className="arabic__label">
                <span className="text-danger">*</span>السعر
              </label>
              <input
                className="form-control w-25 seller__addProduct-input"
                type="number"
                id="arabic__price"
                value={formik.values.ar.price}
                name="ar.price"
                onChange={formik.handleChange}
              />
              {formik.errors.price_ar && (
                <small className="text-danger py-2 d-block fs-5">
                  {formik.errors.price_ar}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="arabic__brand" className="arabic__label">
                <span className="text-danger">*</span>البراند
              </label>
              <input
                className="form-control w-50 seller__addProduct-input"
                type="text"
                id="arabic__brand"
                value={formik.values.ar.brand}
                name="ar.brand"
                onChange={formik.handleChange}
              />
              {formik.errors.brand_ar && (
                <small className="text-danger py-2 d-block fs-5">
                  {formik.errors.brand_ar}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="arabic__discount" className="arabic__label">
                الخصم
              </label>
              <input
                className="form-control w-25 seller__addProduct-input"
                type="number"
                id="arabic__discount"
                value={formik.values.ar.discount}
                name="ar.discount"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="arabic__property" className="arabic__label">
                خصائص المنتج
              </label>
              {formik.values.ar.properities.map((property, index) => (
                <div className="d-flex mb-4">
                  <input
                    className="form-control w-25 py-3 px-4 fs-5"
                    placeholder="أسم الخاصية"
                    value={formik.values.ar.properities[index].name}
                    name={`ar.properities[${index}].name`}
                    onChange={formik.handleChange}
                  />
                  <input
                    className="form-control w-75 py-3 px-4 fs-5"
                    placeholder="وصف الخاصية"
                    value={formik.values.ar.properities[index].value}
                    name={`ar.properities[${index}].value`}
                    onChange={formik.handleChange}
                  />
                </div>
              ))}
              <div className="d-flex justify-content-between">
                {formik.errors.properities_ar && (
                  <small className="text-danger py-2 d-block fs-5">
                    {formik.errors.properities_ar}
                  </small>
                )}
                <button
                  className="btn btn-danger fs-5"
                  onClick={(e) => handleAddProperty(e, "ar")}
                >
                  أضافة خاصية جديده للمنتج
                </button>
              </div>
            </div>
            {/* HANDLE: Images */}
            <div>
              <label htmlFor="arabic__images" className="arabic__label">
                صور المنتج
              </label>
              {formik.values.ar.imgs.map((img, index) => (
                <input
                  className="form-control w-50 seller__addProduct-input mb-3"
                  type="file"
                  id="arabic__images"
                  value={formik.values.ar.imgs[index]}
                  name={`ar.imgs[${index}]`}
                  // onChange={(e) => handleImgs(e, "en")}
                  onChange={formik.handleChange}
                />
              ))}
            </div>
            <div className="d-flex justify-content-between">
              {formik.errors.imgs_ar && (
                <small className="text-danger py-2 d-block fs-5">
                  {formik.errors.imgs_ar}
                </small>
              )}
              <button
                className="btn btn-danger fs-5"
                onClick={(e) => handleMoreImgs(e, "ar")}
              >
                أضافة صورة جديدة للمنتج
              </button>
            </div>
            {/* <button className="seller__addProduct-btn" disabled={true}> */}
            <button
              className="btn btn-primary  fs-4 seller__addProduct-btn"
              disabled={Object.keys(formik.errors).length}
              type="submit"
            >
              Add Product / أضافة المنتج
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
