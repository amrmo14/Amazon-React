import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import "./bigCart.css";
export default function BigCart(props) {
  let { product } = props;
  let prodImg = product.image;
  let lang = useSelector((select) => select.lang.lang);
  return (
    <>
      <div className="col-md customBigCart " dir={lang == "en" ? "ltr" : "rtl"}>
        <h3
          className={
            lang == "en" ? "customBigCart__head-en" : "customBigCart__head-ar"
          }
        >
          {lang == "en" ? product.title.en : product.title.ar}
          <p
            className={lang == "en" ? "customBigCart__en" : "customBigCart__en"}
          >
            {product.discount
              ? lang == "en"
                ? `| Up to ${product.discount}% off `
                : `| خصـم حتي %${product.discount}`
              : ""}
          </p>
        </h3>
        <Link to={product.path} className="w-100 p-0 m-0 img__link">
          <img src={prodImg} alt="product image" className="p-0 m-0" />
        </Link>
        <a
          className={lang == "en" ? "customBigCart__en" : "customBigCart__ar"}
          href={product.path}
        >
          {lang == "en" ? "Shop now" : "تسوق الان"}
        </a>
      </div>
    </>
  );
}
