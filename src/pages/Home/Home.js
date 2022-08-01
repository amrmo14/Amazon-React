import React from "react";
import { useState, useContext, useEffect } from "react";
import BigCart from "../../components/bigCart/BigCart";
import { CartContext } from "../../components/context/cartContext";
import Slider from "../../components/Slider/Slider";
import "./home.css";
import { db } from '../../components/firebase'
import { collection, query, orderBy, onSnapshot, doc, getDocs } from "firebase/firestore";
import { UserContext } from "../../components/context/userContext";

import MidCart from "../../components/midCart/MidCart";

import Footer from "./../../components/Footer/Footer";
import "./home.css";
import SmallCart from "../../components/smallCart/SmallCart";

export default function Home() {
  const { cart, setCart } = useContext(CartContext)
  const { isUser, userId, setUserId, setIsUser } = useContext(UserContext);
  const [user, setUser] = useState({})


  const fetchcart = async () => {
    if (isUser) {
      const userDocRef = doc(db, 'users', userId)
      onSnapshot(userDocRef, (docc) => {

        console.log("home")
        setCart([...docc.data().cart]
        )
      })
    }
    else {
      setCart([])
    }
  }

  useEffect(() => {
    //   if(isUser){
    //     console.log(typeof(userId))
    //     let id =userId
    //     const userDocRef = doc(db, 'users',  userId)
    //     console.log("gkk")
    //     setTimeout(()=>{ 
    //       onSnapshot(userDocRef, (docc) => {

    //         console.log("home")
    //         setCart([...docc.data().cart]
    //         )
    //     }


    //    )
    // },500)

    //     }
    //     else{
    //         setCart([])
    //     }



    fetchcart()
    console.log(cart)
  }, [])
  let [products, setProducts] = useState([
    {
      title: {
        en: "Women's Shoes",
        ar: "أحذية نسائية",
      },
      image: require("../../assets/home/women_shoes.jpg"),
      discount: 40,
      path: "/womenShoes",
    },
    {
      title: {
        en: "Join Prime to access epic deals on Prime Day",
        ar: "اشترك في برايم واستمتع بعروض يوم برايم",
      },
      image: require("../../assets/home/prime.jpg"),
      path: "/prime",
    },
    {
      title: {
        en: "Women's Watches",
        ar: "ساعات للنساء",
      },
      image: require("../../assets/home/women_watches.jpg"),
      discount: 40,
      path: "/womenWatches",
    },
    {
      title: {
        en: "Beach Store",
        ar: "أساسيات البحر",
      },
      image: require("../../assets/home/beach.jpg"),
      discount: 40,
      path: "/beach",
    },
    {
      title: {
        en: "Clearance Sale",
        ar: "عروض أخر فرصة",
      },
      image: require("../../assets/home/discounts.jpg"),
      discount: 50,
      path: "/clearanceSale",
    },
    {
      title: {
        en: "Buy your new phone today",
        ar: "اشتري موبايلك الجديد النهارده",
      },
      image: require("../../assets/home/mobiles.jpg"),
      discount: 20,
      path: "/phones",
    },
    {
      title: {
        en: "Clothes for woman",
        ar: "ملابس للنساء",
      },
      image: require("../../assets/home/women_clothes.jpg"),
      discount: 20,
      path: "/womenClothes",
    },
    {
      title: {
        en: "For 9 EGP | Mobile accessories",
        ar: " فقط 9 جنية | إكسسوارات الموبايلات",
      },
      image: require("../../assets/home/mobile_acc.jpg"),
      path: "/mobileAccessories",
    },
    {
      title: {
        ar: "أساسيات المنزل",
        en: "Home Essentional",
      },
      image: require("../../assets/home/home.jpg"),
      path: "/home",
    },
    {
      title: {
        ar: "نظارات",
        en: "New Arrival | Eyewear",
      },
      image: require("../../assets/home/glasses.jpg"),
      path: "/glasses",
    },
    {
      title: {
        ar: "العدد والادوات",
        en: "Tools & Home Improvement",
      },
      image: require("../../assets/home/tools.jpg"),
      path: "/tools",
    },
    {
      title: {
        ar: "العاب الاطفال",
        en: "Baby's toys",
      },
      image: require("../../assets/home/toys.jpg"),
      path: "/toys",
    },
  ]);
  let [offersToday, setOffersToday] = useState([
    {
      img: require("./../../assets/TodayOffer/watch_mens.jpg"),
      path: "/mensWatches",
      discount_perc: 22,
    },
    {
      img: require("./../../assets/TodayOffer/step.jpg"),
      path: "/steps",
      discount: 10078,
    },
    {
      img: require("./../../assets/TodayOffer/shoes_women.jpg"),
      path: "/shoesWomen",
      discount: 559.2,
    },
    {
      img: require("./../../assets/TodayOffer/shoes_mens.jpg"),
      path: "/shoesMens",
      discount: 2249,
    },
    {
      img: require("./../../assets/TodayOffer/shirt_baby.jpg"),
      path: "/shirtsBaby",
      discount: 210,
    },
    {
      img: require("./../../assets/TodayOffer/sama3a.jpg"),
      path: "/electronic/headphones",
      discount_perc: 22,
    },
    {
      img: require("./../../assets/TodayOffer/gamig.jpg"),
      path: "/computers",
      discount: 250,
    },
    {
      img: require("./../../assets/TodayOffer/crocs.jpg"),
      path: "/crocs",
      discount: 50,
    },
    {
      img: require("./../../assets/TodayOffer/cotonel.jpg"),
      path: "/cotonel",
      discount_perc: 10,
    },
    {
      img: require("./../../assets/TodayOffer/phones.jpg"),
      path: "/phones",
      discount: 400,
    },
    {
      img: require("./../../assets/TodayOffer/mobile_accessories.jpg"),
      path: "/mobileAccessories",
      discount_perc: 22,
    },

    {
      img: require("./../../assets/TodayOffer/shoes_mens_2.jpg"),
      path: "/shoesMens",
      discount: 2249,
    },

    {
      img: require("./../../assets/TodayOffer/active_bage.jpg"),
      path: "/bages",
      discount_perc: 10,
    },
  ]);
  let [budgetStore, setBudgetStroe] = useState({
    en: [
      {
        img: require("./../../assets/budgetStore/sports_en.jpg"),
        path: "/sports",
      },
      {
        img: require("./../../assets/budgetStore/kitchen_en.jpg"),
        path: "/kitchen",
      },
      {
        img: require("./../../assets/budgetStore/home_en.jpg"),
        path: "/home",
      },
      {
        img: require("./../../assets/budgetStore/healtchAndPersonalCare_en.jpg"),
        path: "/healthAndPersonalCare",
      },
      {
        img: require("./../../assets/budgetStore/grocery_en.jpg"),
        path: "/grocery",
      },
      {
        img: require("./../../assets/budgetStore/fashion_en.jpg"),
        path: "/fashion",
      },
      {
        img: require("./../../assets/budgetStore/electronics_en.jpg"),
        path: "/electronics",
      },
      {
        img: require("./../../assets/budgetStore/computers_en.jpg"),
        path: "/computers",
      },
      {
        img: require("./../../assets/budgetStore/beauty_en.jpg"),
        path: "/beauty",
      },
      {
        img: require("./../../assets/budgetStore/babyEssentials_en.jpg"),
        path: "/babyEssential",
      },
    ],
    ar: [
      {
        img: require("./../../assets/budgetStore/sports_ar.jpg"),
        path: "/sports",
      },
      {
        img: require("./../../assets/budgetStore/kitchen_ar.jpg"),
        path: "/kitchen",
      },
      {
        img: require("./../../assets/budgetStore/home_ar.jpg"),
        path: "/home",
      },
      {
        img: require("./../../assets/budgetStore/healtchAndPersonalCare_ar.jpg"),
        path: "/healthAndPersonalCare",
      },
      {
        img: require("./../../assets/budgetStore/grocery_ar.jpg"),
        path: "/grocery",
      },
      {
        img: require("./../../assets/budgetStore/fashion_ar.jpg"),
        path: "/fashion",
      },
      {
        img: require("./../../assets/budgetStore/electronics_ar.jpg"),
        path: "/electronics",
      },
      {
        img: require("./../../assets/budgetStore/computers_ar.jpg"),
        path: "/computers",
      },
      {
        img: require("./../../assets/budgetStore/beauty_ar.jpg"),
        path: "/beauty",
      },
      {
        img: require("./../../assets/budgetStore/babyEssentials_ar.jpg"),
        path: "/babyEssential",
      },
    ],
  });
  return (
    <>
      <div className="homeSection">
        <Slider />
        <div className="homeContent p-0 m-0">
          <div className="row overflow-hidden gx-5 section">
            {products.slice(0, 4).map((prod, index) => (
              <BigCart product={prod} key={index} />
            ))}
          </div>
          <div className="row overflow-hidden gx-5 section">
            {products.slice(4, 8).map((prod, index) => (
              <BigCart product={prod} key={index} />
            ))}
          </div>
          <div className="overflow-hidden section">
            <MidCart products={offersToday} />
          </div>
          <div className="overflow-hidden section">
            <SmallCart
              products={budgetStore}
              title_en="ٍShop the budget store"
              title_ar="ركن التوفير"
            />
          </div>
          <div className="row overflow-hidden gx-5 section">
            {products.slice(8, 12).map((prod, index) => (
              <BigCart product={prod} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
