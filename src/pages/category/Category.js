import React, { useEffect, useReducer, useState } from "react";
import LocalizedStrings from "react-localization";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../../firebase/products/products";
import currencyFormat from "../../components/handleMoney";
import "./category.css";
export default function Category() {
  let category = useParams().category;
  let [products, setProducts] = useState([]);
  let imgRef = React.createRef(null);
  let pageData = new LocalizedStrings({
    ar: {
      products: products?.map((product) => ({
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
      })),
      price: "السعر",
      more: "المزيد",
      discount: " خصم يصل الي ",
    },
    en: {
      products: products?.map((product) => ({
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
      })),
      price: "Price",
      more: "Details",
      discount: "Up to ",
    },
  });
  let lang = useSelector((state) => state.lang.lang);
  pageData.setLanguage(lang);
  useEffect(() => {
    getProductsByCategory(category).then((data) => {
      console.log("Data ", data);
      setProducts(data);
    });
  }, [category]);

  let handleMouseEnterImg = (e, product) => {
    if (product.imgs.length >= 2) e.target.src = product.imgs[1];
  };
  let handleMouseLeaveImg = (e, product) => {
    e.target.src = product.imgs[0];
  };
  return (
    <div
      className={`category row ${
        lang == "en" ? "category__en" : "category__ar"
      }`}
      dir={lang == "en" ? "ltr" : "rtl"}
    >
      <div className="col-md-2 d-md-block d-none"></div>
      <div className="col-md-10 gy-5  row category__right">
        {pageData.products.map((product, index) => (
          <div className="col-lg-3 col-md-4 col-6 " key={index}>
            <div className="category__right-product">
              {product.discount && (
                <div
                  className={`product__discount ${
                    lang == "en"
                      ? "product__discount-left"
                      : "product__discount-right"
                  }`}
                >
                  {pageData.discount}
                  {product.discount}%
                </div>
              )}
              <div className="product__imgBox">
                <img
                  src={product.imgs[0]}
                  ref={imgRef}
                  onMouseEnter={(e) => handleMouseEnterImg(e, product)}
                  onMouseLeave={(e) => handleMouseLeaveImg(e, product)}
                />
              </div>

              <div className="product__info">
                <h3>{product.name.split(" ").splice(0, 15).join(" ")}...</h3>
                <p>
                  {pageData.price} <span>${product.price}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
