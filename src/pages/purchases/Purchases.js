import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LocalizedString from "react-localization";
import { getUserById } from "./../../firebase/users/users";
import { getProductById } from "./../../firebase/products/products";

import "./purchases.css";
export default function Purchases() {
  let lang = useSelector((state) => state.lang.lang);
  let history = useHistory();
  let [products, setProducts] = useState([]);
  // HANDLE: use Effect
  useEffect(() => {
    if (localStorage.getItem("amazon_user")) {
      getUserById(localStorage.getItem("amazon_user")).then((data) => {
        data.purchasedProducts.forEach((purchasedProduct) => {
          getProductById(purchasedProduct.productID).then((data) => {
            setProducts((prevState) => [
              ...prevState,
              { ...data, purchasedDate: purchasedProduct.date },
            ]);
          });
        });
      });
    }
  }, []);
  let pageData = new LocalizedString({
    en: {
      purchase: "My Purchases",
      products: {
        ...products.map((product) => ({
          ...product.en,
          imgs: product.imgs,
          prodQuanityt: product.availablyQuaintity,
          sellerId: product.sellerID,
          discount: product.Discount,
          sellerID: product.sellerID,
          price: product.Price,
          quantity: product.Quantity,
          ShipsFrom: product.ShipsFrom,
          Seller: product.Seller,
          _id: product.id,
        })),
      },
    },
    ar: {
      purchase: "مشترياتي",
      products: [
        ...products.map((product) => ({
          ...product.ar,
          imgs: product.imgs,
          prodQuanityt: product.availablyQuaintity,
          sellerId: product.sellerID,
          discount: product.Discount,
          sellerID: product.sellerID,
          price: product.Price,
          quantity: product.Quantity,
          ShipsFrom: product.ShipsFrom,
          Seller: product.Seller,
          _id: product.id,
        })),
      ],
    },
  });
  pageData.setLanguage(lang);
  return (
    <div
      className={`purchasePage ${lang == "en" ? "en" : "ar"}`}
      dir={lang == "en" ? "ltr" : "rtl"}
    >
      <h2 className="purchasePage__title">{pageData.purchase}</h2>
      <div className="row purchasePage__grid">
        {pageData.products?.map((product, index) => (
          <div className="col-md-3" key={index}>
            <div
              className="purchasePage__grid-product"
              onClick={() => {
                history.push(`/product/${product._id}`);
              }}
            >
              <div className="product__imgBox">
                <img src={product?.imgs[0]} alt="product Image" />
              </div>
              <div className="product__details">
                <h3>{product.name.split(" ").splice(0, 6).join(" ")}...</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
