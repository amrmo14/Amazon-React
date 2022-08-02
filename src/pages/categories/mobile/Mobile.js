import React, { useEffect, useState } from "react";
import { getProductsByCategory } from "../../../firebase/products/products";
import LocalizedStrings from "react-localization";
import { useSelector } from "react-redux/es/exports";
import "./mobile.css";
export default function Mobile() {
  let lang = useSelector((state) => state.lang.lang);
  let [products, setProducts] = useState([]);
  useEffect(() => {
    getProductsByCategory("mobiles").then((data) => {
      setProducts(data);
      console.log(data);
    });
  }, []);
  let pageData = new LocalizedStrings({
    en: {
      products: products?.map((product) => product.en),
    },
    ar: {
      products: products?.map((product) => product.ar),
    },
  });
  pageData.setLanguage(lang);
  return (
    <div className="mobiles">
      <div className="row py-4 g-0" dir={lang == "en" ? "ltr" : "rtl"}>
        {products.map((product, index) => (
          <div className="col-md-3 product__col m-0 p-0" key={index}>
            <div className="product__box d-flex flex-column align-items-start">
              <img src={product.images[0]} alt="product image" />
              <h2>
                {pageData.products[index].name
                  .split(" ")
                  .slice(0, 10)
                  .join(" ") + "..."}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
