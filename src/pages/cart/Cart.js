import React from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../store/actions/cart";
import LocalizedStrings from "react-localization";
import currencyFormat from "./../../components/handleMoney";
import "./cart.css";
export default function Cart() {
  let products = useSelector((state) => state.cart);
  let lang = useSelector((state) => state.lang.lang);
  let cart = useSelector((state) => state.cart);
  let dispatch = useDispatch();
  let handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  let pageData = new LocalizedStrings({
    en: {
      products: products.map((product) => product.product.en),
      page: {
        title: "Shopping Cart",
        price: "Price",
        currency: "EG",
        delete: "Delete",
        quantity: "Quantity",
        noProducts: "No Products in cart",
      },
    },
    ar: {
      products: products.map((product) => product.product.ar),
      page: {
        title: "عربة التسوق",
        price: "السعر",
        currency: "جنية",
        delete: "حذف المنتج",
        quantity: "الكمية",
        noProducts: "العربة فارغة الان",
      },
    },
  });
  pageData.setLanguage(lang);
  return (
    <>
      <div
        className={`customCart ${
          lang == "en" ? "cart__text-en" : "cart__text-ar"
        }`}
        dir={lang == "en" ? "ltr" : "rtl"}
      >
        <div className="row ">
          <div className="col-12 ">
            <h2 className="py-4 fs-1">{pageData.page.title}</h2>
          </div>
          {pageData.products.length > 0 ? (
            pageData.products.map((product, index) => (
              <Link
                to={`/${product.category}/${product.id}`}
                className="cart__link"
              >
                <div className="col-12 d-flex product__cart">
                  <img className="product__cart-img" src={product.imgs[0]} />
                  <div className="d-flex flex-column align-items-start justify-content-around">
                    <>
                      <h2>{product.title}</h2>
                      <h3>
                        {pageData.page.price}: {currencyFormat(product.price)}
                        {pageData.page.currency}
                      </h3>
                      <h4>
                        {pageData.page.quantity}:{" "}
                        <span>{product.quantity}</span>
                      </h4>
                      <button
                        className="btn btn-danger fs-3"
                        onClick={() => handleDelete(product.id)}
                      >
                        {pageData.page.delete}
                      </button>
                    </>
                    {/* {lang == "en" ? (
                      <>
                        <h2>{product.product.en.title}</h2>
                        <h3>Price: {product.product.en.price}EG</h3>
                        <h4>
                          Quantity: <span>{product.quantity}</span>
                        </h4>
                        <button
                          className="btn btn-danger fs-3"
                          onClick={() => handleDelete(product.product.ar.id)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <h2>{product.product.ar.title}</h2>
                        <h3>السعر: {product.product.en.price}جنية</h3>
                        <h4>
                          الكمية: <span>{product.quantity}</span>
                        </h4>
                        <button
                          className="btn btn-danger fs-3"
                          onClick={() => handleDelete(product.product.ar.id)}
                        >
                          حذف المنتج
                        </button>
                      </>
                    )} */}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h3 className=" col-12 text-center mt-5">
              {pageData.page.noProducts}
            </h3>
          )}
        </div>
      </div>
    </>
  );
}
