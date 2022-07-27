import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import LocalizedStrings from "react-localization";
import addToCart_action from "./../../store/actions/cart";
import currencyFormat from "./../../components/handleMoney";
import "./productDetails.css";
export default function ProductDetails() {
  let params = useParams();
  let history = useHistory();
  let lang = useSelector((state) => state.lang.lang);
  let activeImg = useRef();
  let cart = useSelector((state) => state.cart);
  console.log(cart);
  let dispatch = useDispatch();
  let [product, setProduct] = useState({
    en: {
      id: 1,
      title:
        "Xiaomi Redmi Note 11S Dual SIM Amoled DotDisplay 6.43 Inch 90Hz Twilight Blue 8GB RAM 128GB 4G LTE with",
      brand: "Xiaomi",
      price: 6599,
      discount: 2,
      quantity: 5,
      category: "electronics",
      imgs: [
        require("./../../assets/details/1.jpg"),
        require("./../../assets/details/2.jpg"),
        require("./../../assets/details/3.jpg"),
        require("./../../assets/details/4.jpg"),
        require("./../../assets/details/5.jpg"),
        require("./../../assets/details/6.jpg"),
      ],
      properties: [
        { name: "Brand", value: "Xiaomi" },
        { name: "Model number", value: "Redmi Note 11s" },
        { name: "Human interface input", value: "Touchscreen" },
        { name: "Wireless carrier", value: "Unlocked for All Carriers" },
        { name: "Cellular technology", value: "LTE" },
        { name: "OS", value: "	Android 10.0" },
        { name: "Memory storage capacity", value: "128 GB" },
        { name: "Screen size", value: "6.43 Inches" },
        { name: "Front photo sensor resolution", value: "16 MP" },
      ],
      seller: "Amazon.eg",
      shipsFrom: "Amazon.eg",
    },
    ar: {
      id: 1,
      title:
        "شاومي ريدمي نوت 11 اس بشريحتي اتصال اموليد مع صورة نقاط 6.43 بوصة 90 هرتز لون توايلايت بلو 8 جيجا بايت ورام 128 جيجا بايت شبكة الجيل الرابع ال تي اي",
      brand: "شاومي",
      price: 6599,
      quantity: 5,
      discount: 2,
      category: "electronics",
      imgs: [
        require("./../../assets/details/1.jpg"),
        require("./../../assets/details/2.jpg"),
        require("./../../assets/details/3.jpg"),
        require("./../../assets/details/4.jpg"),
        require("./../../assets/details/5.jpg"),
        require("./../../assets/details/6.jpg"),
      ],
      properties: [
        { name: "العلامة التجارية", value: "شاومي" },
        { name: "الموديل", value: "Redmi Note 11s" },
        { name: "واجهة مستخدم الجهاز الرئيسية", value: "شاشة تعمل باللمس" },
        { name: "الناقل اللاسلكي", value: "جميع الناقلين" },
        { name: "التكنولوجيا الخلوية", value: "LTE" },
        { name: "نظام التشغيل	", value: "	اندرويد 10.0" },
        { name: "سعة تخزين الذاكرة", value: "128 غيغابايت" },
        { name: "حجم الشاشة", value: "6.43 بوصة" },
        { name: "دقة مستشعر الصور الأمامية", value: "16 ميغابايت" },
      ],
      seller: "Amazon.eg",
      shipsFrom: "Amazon.eg",
    },
  });
  let pageData = new LocalizedStrings({
    en: {
      product: { ...product.en },
      productCartExist: "Product is already exist!",
      curreny: "EG",
      quantity: "Quantity",
      addToCart: "Add To Cart",
      buyProduct: "Buy Now",
      shipsFrom: "Ships From",
      shipsBy: "Ships By",
    },
    ar: {
      product: { ...product.ar },
      productCartExist: "المنتج موجود في العربة بالفعل!",
      curreny: "جنية",
      quantity: "الكمية",
      addToCart: "أضف الي العربة",
      buyProduct: "اشتري المنتج الان",
      shipsFrom: "يشحن من",
      shipsBy: "يباع من",
    },
  });
  let [quantity, setQuantity] = useState(1);
  let [error, setError] = useState("");
  let space = "  ";
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
  console.log(month, day);
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
    let IS_EXIST = cart.some(
      (cartProduct) => cartProduct.product.en.id == product.en.id
    );
    console.log(IS_EXIST);
    if (!IS_EXIST) {
      dispatch(
        addToCart_action({
          product,
          available_quantity: quantity,
        })
      );
    } else {
      console.log("Exist");
      setError(pageData.productCartExist);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  let handleBuy = () => {
    // history.replace(`./payment/${product.en.id}?quantity=${quantity}`);
    window.location.replace(`/payment/${product.en.id}?quantity=${quantity}`);
  };

  pageData.setLanguage(lang);
  return (
    <>
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
                {pageData.product.imgs.map((img, index) => (
                  <img src={img} key={index} />
                ))}
              </div>
              <div className="gallery__active d-flex justify-content-center align-items-center">
                <img src={pageData.product.imgs[0]} ref={activeImg} />
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="productInfo d-flex flex-column align-items-start">
              <h3 className="productInfo__title">{pageData.product.title}</h3>
              <p className="productInfo__brand">
                Brand : {pageData.product.brand}
              </p>
              <div className="dash"></div>
              {pageData.product.discount ? (
                <div className="productInfo__price">
                  <p className="productInfo__was">
                    {lang == "en" ? "Was:" : "كان :"}{" "}
                    <span>
                      {currencyFormat(pageData.product.price)}
                      {space}
                      {pageData.curreny}
                    </span>
                  </p>
                  <p className="productInfo__withDeal">
                    {lang == "en" ? "With Deal:" : "مع العرض"}
                    <span>
                      {currencyFormat(
                        pageData.product.price -
                          pageData.product.price *
                            (pageData.product.discount / 100)
                      )}
                      {space}
                      {pageData.curreny}
                    </span>
                  </p>
                  <p className="productInfo__save">
                    {lang == "en" ? "You Save:" : "الخصم: "}
                    <span>
                      ({pageData.product.discount}%)
                      {currencyFormat(
                        pageData.product.price *
                          (pageData.product.discount / 100)
                      )}
                      {space}
                      {pageData.curreny}
                    </span>
                  </p>
                </div>
              ) : (
                <p className="productInfo__withDeal">
                  Price:
                  <span>
                    {pageData.curreny}
                    {space}
                    {currencyFormat(pageData.product.price)}
                  </span>
                </p>
              )}
              <div className="dash"></div>
              <div className="productInfo__prop">
                {pageData.product.properties.map((prop, index) => (
                  <p className="productInfo__prop-box" key={index}>
                    <span>{prop.name}</span>: {prop.value}
                  </p>
                ))}
              </div>
            </div>
            {/* {lang == "en" ? (
              <div className="productInfo d-flex flex-column align-items-start">
                <h3 className="productInfo__title">{product.en.title}</h3>
                <p className="productInfo__brand">Brand : {product.en.brand}</p>
                <div className="dash"></div>
                {product.en.discount ? (
                  <div className="productInfo__price">
                    <p className="productInfo__was">
                      Was: <span>EG{currencyFormat(product.en.price)}</span>
                    </p>
                    <p className="productInfo__withDeal">
                      With Deal:
                      <span>
                        EG
                        {currencyFormat(
                          product.en.price -
                            product.en.price * (product.en.discount / 100)
                        )}
                      </span>
                    </p>
                    <p className="productInfo__save">
                      You Save:
                      <span>
                        ({product.en.discount}%) EG
                        {currencyFormat(
                          product.en.price * (product.en.discount / 100)
                        )}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="productInfo__withDeal">
                    Price:
                    <span>
                      EG
                      {currencyFormat(product.en.price)}
                    </span>
                  </p>
                )}
                <div className="dash"></div>
                <div className="productInfo__prop">
                  {product.en.properties.map((prop, index) => (
                    <p className="productInfo__prop-box" key={index}>
                      <span>{prop.name}</span>: {prop.value}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="productInfo d-flex flex-column align-items-start productFont_ar">
                <h3 className="productInfo__title">{product.ar.title}</h3>
                <p className="productInfo__brand">براند : {product.ar.brand}</p>
                <div className="dash"></div>
                {product.ar.discount ? (
                  <div className="productInfo__price">
                    <p className="productInfo__was">
                      كان: <span>{currencyFormat(product.ar.price)}</span>
                      جنية
                    </p>
                    <p className="productInfo__withDeal">
                      مع العرض:
                      <span>
                        {currencyFormat(
                          product.ar.price -
                            product.ar.price * (product.ar.discount / 100)
                        )}
                        <span className="mx-3">جنية</span>
                      </span>
                    </p>
                    <p className="productInfo__save">
                      الخصم:
                      <span>
                        ({product.en.discount}% )
                        {currencyFormat(
                          product.ar.price * (product.ar.discount / 100)
                        )}
                        <span className="mx-3">جنية</span>
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="productInfo__withDeal">
                    السعر:
                    <span>{currencyFormat(product.ar.price)} جنية</span>
                  </p>
                )}
                <div className="dash"></div>
                <div className="productInfo__prop">
                  {product.ar.properties.map((prop, index) => (
                    <p className="productInfo__prop-box" key={index}>
                      <span>{prop.name}</span>: {prop.value}
                    </p>
                  ))}
                </div>
              </div>
            )} */}
          </div>
          <div className="col-md-2">
            <div className="processing">
              <>
                <h5 className="processing__price">
                  {pageData.product.discount
                    ? currencyFormat(
                        pageData.product.price -
                          pageData.product.price *
                            (pageData.product.discount / 100)
                      )
                    : currencyFormat(pageData.product.price)}
                  {space}
                  {pageData.curreny}
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
                  <p className="m-0">{pageData.quantity}</p>
                  <select className="mx-4" onChange={(e) => handleQuantity(e)}>
                    {new Array(pageData.product.quantity)
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
                    {pageData.addToCart}
                  </button>
                  {error && <small className="small__Error">{error}</small>}
                  <button
                    className="w-100 customBtn primaryBtn"
                    onClick={() => handleBuy()}
                  >
                    {pageData.buyProduct}
                  </button>
                </div>
                <p className="processing__seller">
                  {pageData.shipsFrom}: <span>{product.en.shipsFrom}</span>
                </p>
                <p className="processing__seller">
                  {pageData.shipsBy}: <span>{product.en.seller}</span>
                </p>
              </>
              {/* {lang == "en" ? (
                <>
                  <h5 className="processing__price">
                    EG
                    {product.en.discount
                      ? currencyFormat(
                          product.en.price -
                            product.en.price * (product.en.discount / 100)
                        )
                      : currencyFormat(product.en.price)}
                  </h5>
                  <p className="proessing__delivery">
                    Deliver <span>{dateNow.toDateString()}</span>
                  </p>
                  <div className="processing__quantityBox mb-5">
                    <p className="m-0 me-3">Quantity</p>
                    <select onChange={(e) => handleQuantity(e)}>
                      {new Array(product.en.quantity)
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
                      Add To Cart
                    </button>
                    {error && <small className="small__Error">{error}</small>}
                    <button
                      className="w-100 customBtn primaryBtn"
                      onClick={() => handleBuy()}
                    >
                      Buy Now
                    </button>
                  </div>
                  <p className="processing__seller">
                    Ships From: <span>{product.en.shipsFrom}</span>
                  </p>
                  <p className="processing__seller">
                    Ships By: <span>{product.en.seller}</span>
                  </p>
                </>
              ) : (
                ""
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
