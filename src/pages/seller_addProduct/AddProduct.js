import React, { useEffect } from "react";
import { useFormik } from "formik";
import LocalizedStrings from "react-localization";
import "./addProduct.css";
import { addProduct, uploadImgs } from "../../firebase/products/products";
import { useState } from "react";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from "uuid";
import { useSelector } from "react-redux";

export default function AddProduct() {
  let [process, setProcess] = useState("");
  let [imgs, setImgs] = useState([]);
  let [imgsUrl, setImgsUrl] = useState([]);
  let lang = useSelector((state) => state.lang.lang);
  let category_en = [
    {
      name: "Electronics",
      value: "electronics",
    },
    {
      name: "Mobiles",
      value: "mobiles",
    },
    {
      name: "Video Games",
      value: "videoGames",
    },
    {
      name: "Perfumes",
      value: "perfumes",
    },
  ];
  let category_ar = [
    {
      name: "الكترونيات",
      value: "electronics",
    },
    {
      name: "هواتف",
      value: "mobiles",
    },
    {
      name: "العاب فيديو",
      value: "videoGames",
    },
    {
      name: "برفان",
      value: "perfumes",
    },
  ];
  //HANDLE: upload an image to firebase storage
  let urls = [];

  let onUpload = (productId) => {
    imgs.forEach((img) => {
      let imgName = `${productId}/${img.name + v4()}`;
      let imgRef = ref(storage, `images/${imgName}`);
      uploadBytes(imgRef, img).then((uploadedImg) => {
        getDownloadURL(uploadedImg.ref).then((url) => {
          urls.push(url);
          console.log(urls);
          uploadImgs(productId, urls).then(() => {
            setProcess(pageData.success);
            setTimeout(() => {
              setProcess("");
              formik.resetForm();
            }, 2000);
          });
        });
      });
    });
  };
  let pageData = new LocalizedStrings({
    en: {
      wait: "Please wait",
      success: "Producct added successfully",
      failed: "Process is failed, please try again",
    },
    ar: {
      wait: "من فضلك انتظر",
      success: "تم اضافة المنتج بنجاح",
      failed: "فشلت العملية, من فضلك حاول مرة اخري",
    },
  });
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
    if (!values.price) {
      errors.price = "Price is required !/سعر المنتج غير موجود";
    }
    if (!values.en.brand) {
      errors.brand_en = "Brand is required";
    }
    if (!values.ar.brand) {
      errors.brand_ar = "البراند الخاص بالمنتج غير موجود";
    }
    if (!values.en.category) {
      errors.category_en = "Please Select Product Category!";
    }
    if (!values.ar.category) {
      errors.category_ar = "من فضلك قم بتحديد نوع المنتج";
    }
    if (values.en.category != values.ar.category) {
      errors.category_ar =
        "يجب ان يتشابة نوع المنتج باللغتين / Category is not the same type in language";
    }
    if (values.imgs.length == 0) {
      errors.imgs_ar =
        "Product should have at least 1 image / المنتج يجب ان يحتوي علي صور علي الاقل";
    }
    if (values.ar.properities.length != values.en.properities.length) {
      errors.properities_ar =
        "عدد الخصائص لايتطابق مع عدد خصائص المنتج باللغه الانجليزية";
    }
    return errors;
  };
  let formik = useFormik({
    initialValues: {
      en: {
        name: "",
        brand: "",
        properities: [],
        category: "",
      },
      ar: {
        name: "",
        brand: "",
        properities: [],
        category: "",
      },
      price: 0,
      discount: 0,
      imgs: [],
      quantity: 1,
      availablyQuaintity: 0,
      soldQuantity: 0,
    },
    validate,
    onSubmit: (values) => {
      values.availablyQuaintity = values.quantity;
      values.price = Number(values.price);
      values.discount = Number(values.discount);
      setProcess(pageData.wait);
      addProduct(values)
        .then((prodID) => {
          onUpload(prodID);
          //---------------------- START: Reset UI
          setImgs([]);
          urls = [];
          setImgsUrl([]);
          setDynamicIndexs({
            arImgIndex: 0,
            arPropIndex: 0,
            enImgIndex: 0,
            enPropIndex: 0,
          });

          //------------------------ END: RESET UI
        })
        .catch((err) => {
          setProcess(pageData.failed);
          setTimeout(() => {
            setProcess("");
          }, 2000);
        });
    },
  });
  //HANDLE: imgs and property
  let [dynamicIndexs, setDynamicIndexs] = useState({
    enImgIndex: 0,
    arImgIndex: 0,
    enPropIndex: 0,
    arPropIndex: 0,
  });
  let handleAddProperty = (e, formLang) => {
    if (formLang == "en") {
      formik.setFieldValue(`en.properities[${dynamicIndexs.enPropIndex}]`, "");
      setDynamicIndexs((prevState) => {
        return {
          ...prevState,
          enPropIndex: prevState.enPropIndex + 1,
        };
      });
    } else {
      formik.setFieldValue(`ar.properities[${dynamicIndexs.arPropIndex}]`, "");
      setDynamicIndexs((prevState) => {
        return {
          ...prevState,
          arPropIndex: prevState.arPropIndex + 1,
        };
      });
    }
  };

  let handleMoreImgs = (e, formLang) => {
    formik.setFieldValue(`imgs[${dynamicIndexs.enImgIndex}]`, "");
    setDynamicIndexs((prevState) => {
      return {
        ...prevState,
        enImgIndex: prevState.enImgIndex + 1,
      };
    });
  };
  let handleImgs = (file, index) => {
    setImgs((prevState) => [...prevState, file]);
  };
  pageData.setLanguage(lang);
  return (
    <div className={`seller_addProduct `}>
      <div className="row mt-5">
        <div className="col-md-6 english__left d-flex flex-column justify-content-around">
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
            <div className="mb-5">
              <label htmlFor="english__brand" className="english__label">
                <span className="text-danger">*</span>Category
              </label>
              <select
                name="en.category"
                value={formik.values.en.category}
                onChange={formik.handleChange}
                className="py-2 px-5 mt-1 fs-4"
              >
                {category_en.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              {formik.errors.category_en && (
                <small className="text-danger py-2 d-block fs-5">
                  {formik.errors.category_en}
                </small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="english__discount" className="english__label">
                Product Properties
              </label>
              {formik.values.en.properities.map((property, index) => (
                <div className="d-flex mb-4" key={index}>
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
                  type="button"
                >
                  Add Property
                </button>
              </div>
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
                <span className="text-danger">*</span> Price / السعر
              </label>
              <input
                className="form-control w-25 seller__addProduct-input"
                type="number"
                id="arabic__price"
                min="1"
                value={formik.values.price}
                name="price"
                onChange={formik.handleChange}
              />
              {formik.errors.price && (
                <small className="text-danger py-2 d-block fs-5">
                  {formik.errors.price}
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
            <div className="mb-5">
              <label htmlFor="english__brand" className="english__label">
                <span className="text-danger">*</span>النوع
              </label>
              <select
                name="ar.category"
                value={formik.values.ar.category}
                onChange={formik.handleChange}
                className="py-2 px-5 mt-1 fs-4"
              >
                {category_ar.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              {formik.errors.category_ar && (
                <small className="text-danger py-2 d-block fs-5">
                  {formik.errors.category_ar}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="arabic__discount" className="arabic__label">
                Discount /الخصم
              </label>
              <input
                className="form-control w-25 d-inline-block seller__addProduct-input"
                type="number"
                id="arabic__discount"
                min="0"
                value={formik.values.discount}
                name="discount"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="arabic__discount" className="arabic__label">
                Quantity / الكمية
              </label>
              <input
                className="form-control w-25 seller__addProduct-input"
                type="number"
                id="arabic__discount"
                min="1"
                value={formik.values.quantity}
                name="quantity"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="arabic__property" className="arabic__label">
                خصائص المنتج
              </label>
              {formik.values.ar.properities.map((property, index) => (
                <div className="d-flex mb-4" key={index}>
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
                  type="button"
                >
                  أضافة خاصية جديده للمنتج
                </button>
              </div>
            </div>
            {/* HANDLE: Images */}
            <div>
              <label htmlFor="arabic__images" className="arabic__label mb-5">
                Product Images / صور المنتج
              </label>
              {formik.values.imgs.map((img, index) => (
                <input
                  className="form-control  seller__addProduct-input mb-3 d-inline-block"
                  type="file"
                  id="arabic__images"
                  value={formik.values.imgs[index]}
                  name={`imgs[${index}]`}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleImgs(e.target.files[0], index);
                  }}
                  key={index}
                />
              ))}
            </div>
            <div className="d-flex justify-content-between">
              {formik.errors.imgs_ar && (
                <small className="text-danger py-2 d-block fs-5">
                  {formik.errors.imgs_ar}
                </small>
              )}
              <div
                className="btn btn-danger fs-5"
                onClick={(e) => handleMoreImgs(e, "ar")}
                // type="button"
                // href="#"
              >
                أضافة صورة جديدة للمنتج
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary  fs-4 seller__addProduct-btn"
              disabled={Object.keys(formik.errors).length}
            >
              Add Product / أضافة المنتج
            </button>
          </form>
          {process && (
            <div className="alert alert-primary fs-4 mt-4">{process}</div>
          )}
        </div>
      </div>
    </div>
  );
}
