import React from 'react';
import { useParams } from "react-router-dom";
import { useRef,useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { collection, query, orderBy, onSnapshot, doc, getDoc, documentId } from "firebase/firestore"
// import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { db } from "../firebase";
import { UserContext } from '../context/userContext';
import { updateDoc } from "firebase/firestore";
import { CartContext } from '../context/cartContext';
import "./productDetails.css";
import LocalizedStrings from "react-localization";
import currencyFormat from "./../handleMoney";

const ProductDetails = (props) => {

    const { isUser, userId, setUserId, setIsUser } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext)
    const params = useParams();
    const [product, setProduct] = useState([])
    const navigate = useHistory();
    let [show, setShow] = useState(false)
    let lang = useSelector((state) => state.lang.lang);
    let activeImg = useRef();
    let dispatch = useDispatch();
    let [quantity, setQuantity] = useState(1);
    let [error, setError] = useState("");
    let space = "  ";
    let pageData = new LocalizedStrings({
        en: {
          product: { ...product },
          productCartExist: "Product is already exist!",
          curreny: "EG",
          quantity: "Quantity",
          addToCart: "Add To Cart",
          buyProduct: "Buy Now",
          shipsFrom: "Ships From",
          shipsBy: "Ships By",
        },
        ar: {
          product: { ...product },
          productCartExist: "المنتج موجود في العربة بالفعل!",
          curreny: "جنية",
          quantity: "الكمية",
          addToCart: "أضف الي العربة",
          buyProduct: "اشتري المنتج الان",
          shipsFrom: "يشحن من",
          shipsBy: "يباع من",
        },
      });
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
        console.log(quantity)
      };
      pageData.setLanguage(lang);
 
    useEffect(() => {
        const ref = doc(db, "products", params.id)
        onSnapshot(ref, (doc) => {
            setProduct([{
                id: doc.id,
                data: doc.data()
            }])
            console.log(pageData)
        })
    }, [])

   async function addToCart(product,quantity) {
        // setCart([product.data])
        console.log("p", product)
        if (isUser) {
            console.log(userId)
            try {
                const userDocRef = doc(db, 'users', userId)
                if (cart.length == 0) {
                   await updateDoc(userDocRef, {
                        cart: [...cart, { data: { ...product.data, quant: Number(quantity) }, id: product.id }],
                    })
                    console.log("ff", cart)
                }
                else {
                   await updateCart(product)
                }
            } 
            catch (err) {
                alert(err) 
            }
            setShow(true)
            setTimeout(() => setShow(false), 1500)
        }
        else {
            navigate.push("/login")
        }
    }
    const updateCart = async (product) => {
        const userDocRef = await doc(db, 'users', userId)
        console.log("333")
        cart.forEach(item => {
            if (item.id == product.id) {
                item.data.quant = Number(item.data.quant) + Number(quantity)
                console.log(item.data.quant)
                cart.splice(cart.findIndex((ele) => { return ele.id == item.id }), 1);
                updateFoundedinCart(product,item.data.quant)
            } else {
                console.log("hhhhh")
                updateNotinCart(product)
            }
        })
    }
 
    const updateFoundedinCart = async (product,quant) => {
        const userDocRef = await doc(db, 'users', userId)
       await updateDoc(userDocRef, {
            cart: [...cart, { data: { ...product.data, quant: quant }, id: product.id }]
        })

    }

    const updateNotinCart = async (product) => {
        const userDocRef = await doc(db, 'users', userId)
       await updateDoc(userDocRef, {
            cart: [...cart, { data: { ...product.data, quant: Number(quantity) }, id: product.id }]
        })

    }
    return (<>
        <div>
            {product.map((product, index) => {
                return (
                    <>
                    <div
                      className={`details  
                      ${
                        lang == "en" ? "productFont_en" : "productFont_ar"
                      }`
                     
                    }
                    >
                      <div className="row"
                       dir={lang == "en" ? "ltr" : "rtl"}
                       >
                        <div className="col-md-5">
                          <div className="gallery d-flex">
                            <div
                              className="gallery__slider d-flex flex-column align-items-center "
                              onMouseOver={(e) => handleMouseOver(e)}
                            >
                              {pageData.product[0].data.imgs.map((img, index) => (
                                <img src={img} key={index}  className="img-fluid"/>
                              ))} 
                            </div>
                            <div className="gallery__active d-flex justify-content-center align-items-center">
                              <img src={product.data.imgs[0]} 
                              ref={activeImg} 
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="productInfo d-flex flex-column align-items-start">
                            <h3 className="productInfo__title">{product.data[lang].name}</h3>
                            <p className="productInfo__brand">
                              Brand : {product.data[lang].Brand}
                            </p>
                            <div className="dash"></div>
                           {pageData.product[0].data.Discount ? (
                              <div className="productInfo__price">
                                <p className="productInfo__was">
                                  {lang == "en" ? "Was:" : "كان :"}{" "}
                                  <span>
                                    {currencyFormat(pageData.product[0].data.Price)}
                                    {space}
                                    {pageData.curreny}
                                  </span>
                                </p>
                                <p className="productInfo__withDeal">
                                  {lang == "en" ? "With Deal:" : "مع العرض"}
                                  <span>
                                    {currencyFormat(
                                      pageData.product[0].data.Price -
                                      pageData.product[0].data.Price *
                                          (pageData.product[0].data.Discount / 100)
                                    )}
                                    {space}
                                    {pageData.curreny}
                                  </span>
                                </p>
                                <p className="productInfo__save">
                                  {lang == "en" ? "You Save:" : "الخصم: "}
                                  <span>
                                    ({pageData.product[0].data.Discount}%)
                                    {currencyFormat(
                                      pageData.product[0].data.Price *
                                        (pageData.product[0].data.Price / 100)
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
                                  {currencyFormat(pageData.product[0].data.Price)}
                                </span>
                              </p>
                            )} 
                            <div className="dash"></div>
                            <div className="productInfo__prop">
                              {pageData.product[0].data[lang].Description.map((prop, index) => (
                                <p className="productInfo__prop-box" key={index}>
                                  <span>{prop.name}</span>: {prop.value}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="processing">
                            <>
                              <h5 className="processing__price">
                                {pageData.product[0].data.Discount
                                  ? currencyFormat(
                                      pageData.product[0].data.Price -
                                        pageData.product[0].data.Price *
                                          (pageData.product[0].data.Discount / 100)
                                    )
                                  : currencyFormat(pageData.product[0].data.Price)}
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
                                  {new Array(pageData.product[0].data.Quantity)
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
                                  onClick={() => addToCart(product,quantity)}
                                >
                                  {pageData.addToCart}
                                  {/* add to cart */}
                                </button>
                                {(show) ?
                                    <div className="alert alert-danger" role="alert">
                                         Added to cart.
                                    </div>
                                    : <div></div>}
                                {error && <small className="small__Error">{error}</small>}
                                <button
                                  className="w-100 customBtn primaryBtn"
                                //   onClick={() => handleBuy()}
                                >
                                  {pageData.buyProduct}
                                </button>
                              </div>
                              <p className="processing__seller">
                                {pageData.shipsFrom}: <span>{product.data.ShipsFrom}</span>
                              </p>
                              <p className="processing__seller">
                                {pageData.shipsBy}: <span>{product.data.Seller}</span>
                              </p>
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                 
                    {/* <div className='row justify-content-center' key={product.id}>
                        <div className="card col-3 m-5 " >
                            <img src={product.data.Img} className="card-img-top" alt="..." />
                            <div className="card-body text-center">
                                <h5 className="card-title">{product.data.name}</h5>
                                <button type="button" className="btn btn-success" onClick={() => addToCart(product)}>add to cart</button>
                                {(show) ?
                                    <div className="alert alert-danger" role="alert">
                                        product added to cart.
                                    </div>
                                    : <div></div>}

                            </div>
                        </div>
                    </div> */}
                    </>
                )
            })}

        </div>
    </>);
}

export default ProductDetails;