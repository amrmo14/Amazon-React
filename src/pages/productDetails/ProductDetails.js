import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import LocalizedStrings from "react-localization";
import addToCart_action from "./../../store/actions/cart";
import currencyFormat from "./../../components/handleMoney";
import ProductComments from "../../components/productComments/ProductComments";
import "./productDetails.css";
import { getProductById } from "../../firebase/products/products";
export default function ProductDetails() {
  let { id } = useParams();
  let lang = useSelector((state) => state.lang.lang);
  let activeImg = useRef();
  let cart = useSelector((state) => state.cart);
  let dispatch = useDispatch();

  let [prodFromFire, setProdFromFire] = useState({});

  let page = new LocalizedStrings({
    en: {
      productCartExist: "Product is already exist!",
      curreny: "EG",
      quantity: "Quantity",
      addToCart: "Add To Cart",
      buyProduct: "Buy Now",
      shipsFrom: "Ships From",
      shipsBy: "Ships By",
      price: "Price",
      product: {
        ...prodFromFire.en,
        imgs: prodFromFire.imgs,
        prodQuanityt: prodFromFire.availablyQuaintity,
        sellerId: prodFromFire.sellerID,
        discount: prodFromFire.Discount,
        sellerID: prodFromFire.sellerID,
        price: prodFromFire.Price,
        quantity: prodFromFire.Quantity,
        ShipsFrom: prodFromFire.ShipsFrom,
        Seller: prodFromFire.Seller,
      },
    },
    ar: {
      productCartExist: "المنتج موجود في العربة بالفعل!",
      curreny: "جنية",
      quantity: "الكمية",
      addToCart: "أضف الي العربة",
      buyProduct: "اشتري المنتج الان",
      shipsFrom: "يشحن من",
      shipsBy: "يباع من",
      price: "السعر",
      product: {
        ...prodFromFire.ar,
        imgs: prodFromFire.imgs,
        prodQuanityt: prodFromFire.availablyQuaintity,
        sellerId: prodFromFire.sellerID,
        discount: prodFromFire.Discount,
        sellerID: prodFromFire.sellerID,
        price: prodFromFire.Price,
        quantity: prodFromFire.Quantity,
        ShipsFrom: prodFromFire.ShipsFrom,
        Seller: prodFromFire.Seller,
      },
    },
  });
  let [quantity, setQuantity] = useState(1);
  let [error, setError] = useState("");
  let space = "  ";
  //HANDLE: use Effect
  useEffect(() => {
    getProductById(id).then((data) => {
      setProdFromFire(data);
    });
  }, []);
  //HANDLE: Delivery Date
  let dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 3);
  let months = [
    "يناير",
    "فبراير",
    "مارس",
    "إبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  let days = [
    "اﻷحد",
    "اﻷثنين",
    "الثلاثاء",
    "اﻷربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  let month = months[new Date().getMonth()];
  let day = days[new Date().getDay() + 3];
  //---------------------------------------
  let handleMouseOver = (e) => {
    if (e.target.src) {
      activeImg.current.src = e.target.src;
      e.target.classList.add("active");
    }
  };
  let handleQuantity = (e) => {
    setQuantity(e.target.value);
  };
  let handleAddToCart = () => {
    let IS_EXIST = cart.some((cartProduct) => cartProduct.product.en.id == id);
    console.log(IS_EXIST);
    if (!IS_EXIST) {
      dispatch(
        addToCart_action({
          prodFromFire,
          available_quantity: quantity,
        })
      );
    } else {
      console.log("Exist");
      setError(page.productCartExist);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  let handleBuy = () => {
    window.location.replace(`/payment/${id}?quantity=${quantity}`);
  };

  page.setLanguage(lang);
  return (
    <>
      {prodFromFire ? (
        <div
          className={`details ${
            lang == "en" ? "productFont_en" : "productFont_ar"
          }`}
        >
          <div className="row" dir={lang == "en" ? "ltr" : "rtl"}>
            <div className="col-md-5">
              <div className="gallery d-flex">
                <div
                  className="gallery__slider d-flex flex-column align-items-center "
                  onMouseOver={(e) => handleMouseOver(e)}
                >
                  {page.product.imgs &&
                    page.product.imgs.map((img, index) => (
                      <img src={img} key={index} />
                    ))}
                </div>
                <div className="gallery__active d-flex justify-content-center align-items-center">
                  {page.product.imgs && (
                    <img src={page.product.imgs[0]} ref={activeImg} />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="productInfo d-flex flex-column align-items-start">
                <h3 className="productInfo__title">{page.product.name} </h3>

                <p className="productInfo__brand">
                  Brand : {page.product.Brand}
                </p>

                <div className="dash"></div>
                {page.product.discount && page.product.price ? (
                  <div className="productInfo__price">
                    <p className="productInfo__was">
                      {lang == "en" ? "Was:" : "كان :"}{" "}
                      <span>
                        {currencyFormat(page.product.price)}
                        {space}
                        {page.curreny}
                      </span>
                    </p>
                    <p className="productInfo__withDeal">
                      {lang == "en" ? "With Deal:" : "مع العرض"}
                      <span>
                        {currencyFormat(
                          page.product.price -
                            page.product.price * (page.product.discount / 100)
                        )}
                        {space}
                        {page.curreny}
                      </span>
                    </p>
                    <p className="productInfo__save">
                      {lang == "en" ? "You Save:" : "الخصم: "}
                      <span>
                        ({page.product.discount}%)
                        {currencyFormat(
                          page.product.price * (page.product.discount / 100)
                        )}
                        {space}
                        {page.curreny}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="productInfo__withDeal">
                    {page.price}:
                    <span>
                      {page.curreny}
                      {space}
                      {page.product.price && currencyFormat(page.product.price)}
                    </span>
                  </p>
                )}
                <div className="dash"></div>
                <div className="productInfo__prop">
                  {page.product.Description &&
                    page.product.Description.map((prop, index) => (
                      <p className="productInfo__prop-box" key={index}>
                        <span>{prop.name}</span>: {prop.value}
                      </p>
                    ))}
                </div>
                {/* HANDLE: product comments */}
                <ProductComments />
              </div>
            </div>
            {/* HANDLE: Add to cart and buy column */}
            <div className="col-md-2">
              <div className="processing">
                <>
                  <h5 className="processing__price">
                    {page.product.discount && page.product.price
                      ? currencyFormat(
                          page.product.price -
                            page.product.price * (page.product.discount / 100)
                        )
                      : page.product.price &&
                        currencyFormat(page.product.price)}
                    {space}
                    {page.curreny}
                  </h5>
                  <p className="proessing__delivery">
                    {lang == "en" ? "Deliver" : "التوصيل:"}
                    {space}
                    {lang == "en" ? (
                      <span>{dateNow.toDateString()}</span>
                    ) : (
                      <span>
                        {day} {dateNow.getDate()}
                        {month} {dateNow.getFullYear()}
                        {}
                      </span>
                    )}
                  </p>
                  <div className="processing__quantityBox mb-5">
                    <p className="m-0">{page.quantity}</p>
                    <select
                      className="mx-4"
                      onChange={(e) => handleQuantity(e)}
                    >
                      {new Array(page.product.quantity)
                        .fill(0)
                        .map((num, index) => (
                          <option value={index + 1} key={index}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="btns my-4 d-flex flex-column align-items-center justify-content-center ">
                    <button
                      className="w-100 customBtn secondaryBtn"
                      onClick={() => handleAddToCart()}
                    >
                      {page.addToCart}
                    </button>
                    {error && <small className="small__Error">{error}</small>}
                    <button
                      className="w-100 customBtn primaryBtn"
                      onClick={() => handleBuy()}
                    >
                      {page.buyProduct}
                    </button>
                  </div>
                  <p className="processing__seller">
                    {page.shipsFrom}: <span>{page.product.ShipsFrom}</span>
                  </p>
                  <p className="processing__seller">
                    {page.shipsBy}: <span>{page.product.Seller}</span>
                  </p>
                </>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}
