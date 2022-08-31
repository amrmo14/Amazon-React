import React, { useEffect, useState } from "react";
import LocalizedString from "react-localization";
import {
  filterProducts,
  getProductsByUserId,
  getProductsWithFields,
} from "../../firebase/products/products";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./productsDashboard.css";
export default function ProductsDashboard() {
  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState("");
  let [selectValue, setSelectValue] = useState("");
  let [searchType, setSearchType] = useState(["price", "category", "discount"]);
  let [sidebar, setSidebar] = useState([
    "mostSold",
    "lowestSold",
    "price",
    "discount",
  ]);
  let [sideValue, setSideValue] = useState("");
  useEffect(() => {
    getProductsByUserId(localStorage.getItem("userId")).then((data) => {
      setProducts(data);
    });
  }, []);
  let page = new LocalizedString({
    en: {
      products: products.map((product) => {
        return {
          ...product.en,
          availablyQuaintity: product.availablyQuaintity,
          comments: product.comments,
          discount: product.Discount,
          images: product.imgs,
          quantity: product.Quantity,
          soldQuantity: product.soldQuantity,
          productID: product.productID,
          price: product.Price,
        };
      }),
      title: "Products Management Dashboard",
      search_placeholder: "Search for specific product",
      select_placeholder: "Search Type",
      select_type: ["Price", "Category", "Discount"],
      moreControl: "More Control ?",
      sidebar: ["Most Sold", "lowest Sold", "Price", "Discount"],
      price: "Price",
      quantity: "Quantity",
      discount: "Discount",
      ui_avQuantity: "Available Quantity",
      addProduct: "Add New Product",
    },
    ar: {
      products: products.map((product) => {
        return {
          ...product.ar,
          availablyQuaintity: product.availablyQuaintity,
          comments: product.comments,
          discount: product.Discount,
          images: product.imgs,
          quantity: product.Quantity,
          soldQuantity: product.soldQuantity,
          productID: product.productID,
          price: product.Price,
        };
      }),
      title: "ادارة المنتجات",
      search_placeholder: "ابحث عن منتج معين",
      select_placeholder: "حدد النوع",
      select_type: ["السعر", "القسم", "التخفيض"],
      moreControl: "تحكم أكثر؟",
      sidebar: ["الاكثر مبيعا", "الاقل مبيعا", "الاغلي", "الخصومات"],
      price: "السعر",
      quantity: "الكمية",
      discount: "الخصم",
      ui_avQuantity: "الكمية المتاحة",
      addProduct: "اضافة منتج جديد",
    },
  });
  let lang = useSelector((state) => state.lang.lang);
  page.setLanguage(lang);
  let handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(selectValue);
    if (e.target.value)
      getProductsWithFields(selectValue, e.target.value, lang).then((data) => {
        console.log(data);
        setProducts(data);
      });
    else
      getProductsByUserId(localStorage.getItem("userId")).then((data) => {
        setProducts(data);
      });
  };
  let handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };
  let handleRadioChange = (e) => {
    setSideValue(e.target.value);
    filterProducts(e.target.value).then((data) => {
      console.log(data);
      setProducts(data);
    });
  };
  return (
    <div
      className={`productsDashboard ${
        lang == "en" ? "productsDashboard__en" : "productsDashboard__ar"
      }`}
      dir={lang == "en" ? "ltr" : "rtl"}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h2>{page.title}</h2>
        <button className="btn btn-danger px-5 py-3 fs-4">
          <Link
            to={`/seller/${localStorage.getItem("userId")}`}
            className="addProduct__link"
          >
            {page.addProduct}
          </Link>
        </button>
      </div>
      <div className="row">
        {/* HANDLE: LEFT seciton */}
        <div className="col-md-2 productsDashboard__right ">
          <div className="d-flex flex-column align-items-center">
            <img
              src={require("./../../assets/amazon_mobile.png")}
              className="w-25"
            />
            <h3 className="fs-1 my-5">{page.moreControl}</h3>
          </div>
          <div className="d-flex flex-column align-items-center">
            {page.sidebar.map((side, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="filter"
                  value={sidebar[index]}
                  onChange={(e) => handleRadioChange(e)}
                />
                <span>{side}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="col-md-1"></div>
        {/* HANDLE: RIGHT Section */}
        <div className="col-md-9 productsDashboard__left">
          {/* HANDLE: Search  */}
          <div className="d-flex align-items-center mb-5">
            <select
              className=" rounded-pill fs-4 py-3 px-5"
              name="select"
              value={selectValue}
              onChange={(e) => handleSelectChange(e)}
            >
              <option disabled={true} defaultValue>
                {" "}
                {page.select_placeholder}
              </option>
              {page.select_type.map((select, index) => {
                return (
                  <option value={searchType[index]} key={index}>
                    {select}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => handleSearch(e)}
              className="form-control w-75 rounded-pill py-3 px-5 fs-3 mx-3"
              placeholder={page.search_placeholder}
            />
          </div>
          {/* ------------------------------------------------------------------------- */}
          {/* HANDLE: Product */}
          <div className="row g-2 ">
            {products.length > 0 ? (
              page.products.map((product, index) => (
                <div className="col-md-3">
                  <div
                    key={index}
                    className="d-flex flex-column justify-content-between align-items-start customProduct "
                  >
                    <img
                      src={product.images[0]}
                      className="align-self-center"
                    />
                    <h3>
                      {product.name.split(" ").slice(0, 10).join(" ")} ....
                    </h3>
                    <div className="row mt-auto ">
                      <p className=" col-6 fs-4 my-3">
                        {page.price}:{" "}
                        <span className="fs-5">{product.price}</span>
                      </p>
                      <p className=" col-6 fs-4 my-2">
                        {page.discount}:{" "}
                        <span className="fs-5">{product.discount} %</span>
                      </p>
                      <p className=" col-6 fs-4 my-2">
                        {page.quantity}:{" "}
                        <span className="fs-5">{product.quantity}</span>
                      </p>
                      <p className=" col-6 fs-4 my-2">
                        {page.ui_avQuantity}:{" "}
                        <span className="fs-5">
                          {product.availablyQuaintity}
                        </span>
                      </p>
                    </div>
                    <div className="d-flex align-items-end justify-content-end w-100 justify-self-end ">
                      <Link to={`/editProduct/${product.productID}`}>
                        <i className="fa-solid fa-pen-to-square text-danger fs-3 align-self-end customEdit"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 d-flex align-items-center justify-content-center ">
                <div className="spinner-border fs-5 " role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
          {/* ------------------------------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
}
