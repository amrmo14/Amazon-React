import React, { useEffect, useState } from "react";
import { getProductById, updatProduct } from "../../firebase/products/products";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LocalizedStrings from "react-localization";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import "./editProduct.css";
export default function EditProduct() {
  let productID = useParams().productID;
  let lang = useSelector((state) => state.lang.lang);
  let [product, setProduct] = useState({});
  let history = useHistory();
  let page = new LocalizedStrings({
    en: {
      product: {
        ...product.en,
      },
      title: "Edit Product",
      productName: "Product Name",
      productBrand: "Product Brand",
      productCategory: "Product Category",
    },
    ar: {
      product: {
        ...product.ar,
      },
      title: "تعديل المنتج",
      productName: "اسم المنتج",
      productBrand: "البراند",
      productCategory: "تصنيف المنتج",
    },
  });
  useEffect(() => {
    getProductById(productID).then((data) => {
      setProduct(data);
      console.log(data);
      formik.setFieldValue("en", data.en);
      formik.setFieldValue("ar", data.ar);
      formik.setFieldValue("Price", data.Price);
      formik.setFieldValue("Discount", data.Discount);
    });
  }, []);
  let formik = useFormik({
    initialValues: {
      en: {},
      ar: {},
    },
    onSubmit: (values) => {
      console.log(values);

      values.discount = Number(values.discount);
      updatProduct(values, productID).then(() => {
        console.log("updated");
      });
    },
  });
  page.setLanguage(lang);
  return (
    <div className={lang == "en" ? "editProduct__en" : "editProduct__ar"}>
      <h2 className="editProduct__title" dir={lang == "en" ? "ltr" : "rtl"}>
        {page.title}
      </h2>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <form
            className="w-50 text-center"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <div className="mb-5">
              <label className="mb-2 fs-2">Product Name</label>
              <input
                type="text"
                className="form-control fs-4 px-4 py-2"
                value={formik.values.en.name}
                name="en.name"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="mb-2 fs-2">Product Brand</label>
              <input
                type="text"
                className="form-control fs-4 px-4 py-2"
                value={formik.values.en.Brand}
                name="en.brand"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="mb-2 fs-2">Product Category</label>
              <input
                type="text"
                className="form-control fs-4 px-4 py-2"
                value={formik.values.en.category}
                name="en.category"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="mb-2 fs-2">اسم المنتج</label>
              <input
                type="text"
                className="form-control fs-4 px-4 py-2"
                value={formik.values.ar.name}
                name="ar.name"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="mb-2 fs-2">البراند</label>
              <input
                type="text"
                className="form-control fs-4 px-4 py-2"
                value={formik.values.ar.Brand}
                name="ar.brand"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="mb-2 fs-2">تصنيف المنتج</label>
              <input
                type="text"
                className="form-control fs-4 px-4 py-2"
                value={formik.values.ar.category}
                name="ar.category"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="mb-2 fs-2">Product Price / سعر المنتج</label>
              <input
                type="text"
                className="form-control fs-4 px-4 py-2"
                value={formik.values.Price}
                name="Price"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="mb-2 fs-2">Product Dicsount / التخفيض</label>
              <input
                type="text"
                className="form-control fs-4 px-4 py-2"
                value={formik.values.Discount}
                name="Discount"
                onChange={formik.handleChange}
              />
            </div>
            <div className="d-flex justify-content-end align-items-end my-4">
              <button
                type="button"
                className="btn btn-danger px-5 py-2 fs-5 me-4"
                onClick={() => {
                  history.goBack();
                }}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn btn-secondary px-5 py-2 fs-5"
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
