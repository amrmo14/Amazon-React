import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import toggleSidebar_Action from "../../store/actions/toggleSidebar";
import toggleSidebarOverlay_Action from "../../store/actions/toggleSidebarOverlay";
import NestedSidebar from "../Sidebar/NestedSidebar";
import "./navbar.css";
export default function Navbar() {
  let { isOpen } = useSelector((state) => state.toggleNestedSidebar);
  let { lang } = useSelector((state) => state.lang);
  console.log(lang);
  let dispatch = useDispatch();

  const [navbar, setNavbar] = useState({
    en: [
      { item: "All", path: "/all" },
      { item: "Today's Deals", path: "/todaydeals" },
      { item: "Mobile Phones", path: "/mobile" },
      { item: "Electronics", path: "/electronics" },
      { item: "Help", path: "/help" },
      { item: "Appliances", path: "/appliances" },
      { item: "Fashion", path: "/fashion" },
      { item: "Prime", path: "/prime" },
      { item: "Home", path: "/home" },
      { item: "Video Games", path: "/videogames" },
      { item: "Grocery", path: "/grocery" },
      { item: "Toys & Games", path: "/toys" },
      { item: "Perfumes", path: "/perfumes" },
      { item: "Your amazon.eg", path: "/youramazon" },
      { item: "Coupons", path: "/coupons" },
      { item: "Sell", path: "/sell" },
    ],
    ar: [
      { item: "الكل", path: "/all" },
      { item: "عروض اليوم", path: "/todaydeals" },
      { item: "موبايلات", path: "/mobile" },
      { item: "الإلكترونيات", path: "/electronics" },
      { item: "المساعدة", path: "/help" },
      { item: "الأجهزة المنزلية", path: "/appliances" },
      { item: "الموضة", path: "/fashion" },
      { item: "برايم", path: "/prime" },
      { item: "مستلزمات المنزل", path: "/home" },
      { item: "ألعاب الفيديو", path: "/videogames" },
      { item: "السوبر ماركت", path: "/grocery" },
      { item: "الدمي والألعاب", path: "/toys" },
      { item: "العطور", path: "/perfumes" },
      { item: "أمازون الخاص بك", path: "/youramazon" },
      { item: "الكوبونات", path: "/coupons" },
      { item: "ابدأ البيع", path: "/sell" },
    ],
  });
  let handleOpenIcon = (e) => {
    dispatch(toggleSidebar_Action(true));
    dispatch(toggleSidebarOverlay_Action(false));
  };
  return (
    <>
      <nav className="customNav" dir={lang == "en" ? "ltr" : "rtl"}>
        <ul>
          {lang == "en"
            ? navbar.en.map((item, index) =>
                item.item == "All" ? (
                  <li key={index} onClick={(e) => handleOpenIcon(e)}>
                    <i className="fa-solid fa-bars"></i>
                    {item.item}
                  </li>
                ) : (
                  <li key={index}>
                    <Link to={item.path} className="customLink">
                      {item.item}
                    </Link>
                  </li>
                )
              )
            : navbar.ar.map((item, index) =>
                item.item == "الكل" ? (
                  <li
                    key={index}
                    onClick={(e) => handleOpenIcon(e)}
                    className="arabicFont"
                  >
                    <i className="fa-solid fa-bars"></i>
                    {item.item}
                  </li>
                ) : (
                  <li key={index} className="arabicFont">
                    <Link to={item.path} className="customLink">
                      {item.item}
                    </Link>
                  </li>
                )
              )}
          {/* {navbar.en.map((item, index) =>
            item.item == "All" ? (
              <li key={index} onClick={(e) => handleOpenIcon(e)}>
                <i className="fa-solid fa-bars"></i>
                {item.item}
              </li>
            ) : (
              <li key={index}>
                <Link to={item.path} className="customLink">
                  {item.item}
                </Link>
              </li>
            )
          )} */}
        </ul>
      </nav>
      <Sidebar />
      {isOpen && <NestedSidebar />}
    </>
  );
}
