import React, { useContext, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import lang__action from "./../../store/actions/lang";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/exports";
import { logout } from "../firebase";
import "./header.css";
import { UserContext } from "../context/userContext";
import { CartContext } from "../context/cartContext";
import { useHistory } from "react-router-dom";

import { getSeller } from "../../firebase/seller/sellers";
import logging_action from "./../../store/actions/logging";
import "./header.css";
export default function Header() {
  const {isUser,setIsUser}=useContext(UserContext)
  const navigate = useHistory();
  let [category, setCategory] = useState({
    en: [
      { cat: "all" },
      { cat: "Amazon Devices" },
      { cat: "Amazon Fashion" },
      {
        cat: "Arts, Crafts & Sewing",
      },
      {
        cat: "Automative Parts & Accessories",
      },
      {
        cat: "Baby",
      },
      {
        cat: "Beauty & Personal Care",
      },
      {
        cat: "Books",
      },
      {
        cat: "Electronitcs",
      },
      {
        cat: "Grocery & Gourmet Food",
      },
      {
        cat: "Health, Household & Baby Care",
      },
      {
        cat: "Home & Garden",
      },
      {
        cat: "Home Related",
      },
      {
        cat: "Industrial & Secientific",
      },
      {
        cat: "Musical Instruments",
      },
      {
        cat: "Office Products",
      },
      {
        cat: "Pet Supplies",
      },
      {
        cat: "Prime Day",
      },
      {
        cat: "Software",
      },
      {
        cat: "Sports",
      },
      {
        cat: "Tools & Home Imporvement",
      },
      {
        cat: "Toys & Games",
      },
      {
        cat: "Video Games",
      },
    ],
    ar: [
      { cat: "الكل" },
      { cat: "Primae Day" },
      { cat: "آلات موسيقية" },
      { cat: "أجهزة Amazon" },
      { cat: "أدوات وتحسينات المنزل" },
      { cat: "أزياء Amazon" },
      { cat: "ألعاب الفيديو" },
      { cat: "الألعاب والدمي" },
      { cat: "الإلكترونيات" },
      { cat: "البقالة والطعام الفاخر" },
      { cat: "الجمال والعناية الشخصية" },
      { cat: "الرياضة" },
      { cat: "الصحة, الأسرة والعناية بالطفل" },
      { cat: "الصناعة والعلم" },
      { cat: "الفنون والحرف والخياطة" },
      { cat: "المنزل والحديقة" },
      { cat: "برمجية" },
      { cat: "طفل" },
      { cat: "قطع وإكسسوارات السيارات" },
      { cat: "كتب" },
      { cat: "مستلزمات الحيوانات الأليفة" },
      { cat: "منتجات المكتب" },
      { cat: "منتجات المكتب" },
    ],
  });
  let [selectedCat, setSelectedCat] = useState("");
  let [searchValue, setSearchValue] = useState("");
  let dispatch = useDispatch();
  let lang = useSelector((select) => select.lang.lang);
  const{cart,setCart}=useContext(CartContext)
  console.log(lang);
  let handleCategory = (e) => {
    setSelectedCat(e.target.value);
  };
  let handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  let handleLang = (e) => {
    dispatch(lang__action(e.target.value));
  };
  let [user, setUser] = useState({});
  let IS_LOGGED = useSelector((state) => state.isLogged);
  useEffect(() => {
    let user = localStorage.getItem("userId");
    if (user) {
      getSeller(user).then((data) => {
        setUser(data);
        dispatch(logging_action(true));
      });
    }
  }, [IS_LOGGED]);
  return (
    <>
      <div
        className={
          lang == "en"
            ? "customContainer d-flex align-items-center header__en justify-content-around"
            : "customContainer d-flex align-items-center header__ar justify-content-around"
        }
        dir={lang == "en" ? "ltr" : "rtl"}
        id="header"
      >
        <div className="logo me-5">
          <Link to="/" className="logo__link">
            <img src={require("./../../assets/amazon_white.png")} />
          </Link>
        </div>
        <form className="header__form">
          <select
            onChange={(e) => handleCategory(e)}
            className={lang == "en" ? "header__selectEn" : "header__selectAr"}
          >
            {lang == "en"
              ? category.en.map((cat, index) => (
                  <option value={cat.cat} key={index}>
                    {cat.cat}
                  </option>
                ))
              : category.ar.map((cat, index) => (
                  <option value={cat.cat} key={index}>
                    {cat.cat}
                  </option>
                ))}
          </select>
          <input
            type="text"
            className="header__searchInput"
            placeholder={lang == "en" ? "Search" : "أبحث"}
            onChange={(e) => handleSearch(e)}
          />
          <button type="submit" className="header__submit m-0">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <select className="header__lang" onChange={(e) => handleLang(e)}>
          <option value="en" defaultValue={lang}>
            English - EN
          </option>
          <option value="ar">العربيــة - AR</option>
        </select>
        {(isUser)?<Link to="/cart" className="cart__link">
          <div className="header__cart mx-4 d-flex align-items-center">
            <p className="m-0">{lang == "en" ? "Cart" : "العربــة"}</p>
            <div className="header__cart-box position-relative">
              <p className="header__cart-box-number">{cart.length}</p>
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
        
        </Link>:
        <Link to="/login" className="cart__link">
        <div className="header__cart mx-4 d-flex align-items-center">
          <p className="m-0">{lang == "en" ? "Cart" : "العربــة"}</p>
          <div className="header__cart-box position-relative">
            <p className="header__cart-box-number">{cart.length}</p>
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
      
      </Link>
        }


        {(isUser==false)?
        <Link to='/login'>
        <button className="header__loginBtn">
        {lang == "en" ? "Login" : "تسجيل الدخول"}
      </button>
      </Link>
    :<button className="header__loginBtn" onClick={()=>{logout()
      setIsUser(false)
      window.location.reload()
      }}>
        {lang == "en" ? "Logout" : "تسجيل الخروج"}
        <span>{user.name}</span>
      </button>} 
        
        
      </div>
    </>
  );
}
