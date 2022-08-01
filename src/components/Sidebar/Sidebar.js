import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import toggleSidebar_Action from "../../store/actions/toggleSidebar";
import toggleSidebarOverlay_Action from "../../store/actions/toggleSidebarOverlay";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";
export default function Sidebar(props) {
  let IS_OPEN = useSelector((state) => state.toggleSidebar);
  let IS_OVERLAY_OPEN = useSelector((state) => state.toggleSidebarOverlay);
  let dispatch = useDispatch();
  let side_ref = React.createRef();
  let overlayRef = React.createRef();
  let IS_LOGIN = false;
  let { lang } = useSelector((state) => state.lang);
  let location = "Egypt";
  let [IS_VIEW, setISVIEW] = useState(false);
  let [sidebar_items, setSidebar_items] = useState({
    en: [
      {
        title: "Trending",
        main_items: {
          topFour: [
            {
              item_title: "Best Sellers",
              path: "/bestsellers",
              childItems: [],
            },
            {
              item_title: "New Releases",
              path: "/newreleases",
              childItems: [],
            },
            {
              item_title: "Movers & Shakers",
              path: "/movers-and-shakers",
              childItems: [],
            },
          ],
          last: [],
        },
      },
      {
        title: "Digital Content And Devices",
        main_items: {
          topFour: [
            {
              item_title: "Amazon Kindle E-readers",
            },
          ],
          last: [],
        },
      },
      {
        title: "Shop by Category",
        main_items: {
          topFour: [
            {
              item_title: "electronics",
              childItems: [
                {
                  item_title: "Accessories & Supplies",
                  path: "accessories-and-supplies",
                },
                {
                  item_title: "Camera & Photo",
                  path: "camera-and-photo",
                },
                {
                  item_title: "Car & Vechial Electronics",
                  path: "car-and-vechial-electronics",
                },
                {
                  item_title: "Cell Phones & Accessories",
                  path: "car-and-vechial-electronics",
                },
                {
                  item_title: "Computers & Accessories",
                  path: "car-and-vechial-electronics",
                },
                {
                  item_title: "GPS & Navigation",
                  path: "car-and-vechial-electronics",
                },
                {
                  item_title: "Headphones",
                  path: "car-and-vechial-electronics",
                },
                {
                  item_title: "Home Audio",
                  path: "car-and-vechial-electronics",
                },
                {
                  item_title: "Office Electronics",
                  path: "car-and-vechial-electronics",
                },
                {
                  item_title: "Portable Audio & Videos",
                  path: "car-and-vechial-electronics",
                },
                {
                  item_title: "Security & Surveillance",
                  path: "car-and-vechial-electronics",
                },
                {
                  item_title: "Service Plans",
                  path: "car-and-vechial-electronics",
                },
                {
                  item_title: "Television & Video",
                  path: "car-and-vechial-electronics",
                },
                {
                  item_title: "Video Game Consoles & Accessories",
                  path: "car-and-vechial-electronics",
                },
                {
                  item_title: "Video Projectors",
                  path: "car-and-vechial-electronics",
                },
                {
                  item_title: "Wearable Technology",
                  path: "car-and-vechial-electronics",
                },
              ],
            },
            {
              item_title: "computers",
            },
            {
              item_title: "smart home",
            },
            {
              item_title: "Arts & crafts",
            },
          ],
          last: [
            {
              item_title: "Automotive",
            },
            {
              item_title: "Baby",
            },
            {
              item_title: "Beauty and personal care",
            },
            {
              item_title: "Women's Fashion",
            },
            {
              item_title: "Men's Fashion",
            },
            {
              item_title: "Girl's Fashion",
            },
            {
              item_title: "Boy's Fashion",
            },
            {
              item_title: "Health and Household",
            },
            {
              item_title: "Home and kitchen",
            },
            {
              item_title: "Industrial and scientific",
            },
            {
              item_title: "Luggage",
            },
            {
              item_title: "Movies & Television",
            },
            {
              item_title: "Pet Supplies",
            },
            {
              item_title: "Software",
            },
            {
              item_title: "Sports & Outdoors",
            },
            {
              item_title: "Tools & home imporvement",
            },
            {
              item_title: "Toys and games",
            },
            {
              item_title: "Video games",
            },
          ],
        },
      },
      {
        title: "Programs & Features",
        main_items: {
          topFour: [
            {
              item_title: "Today's Deals",
              childItems: [],
              path: "/todays-deals",
            },
          ],
          last: [],
        },
      },
      {
        title: "Help & Setting",
        main_items: {
          topFour: [
            {
              item_title: "Your Account",
              childItems: [],
              path: "/account",
            },
            {
              item_title: "English",
              childItems: [],
              path: "/language",
            },
            {
              item_title: location,
              childItems: [],
              path: "location",
            },
            {
              item_title: "Help",
              childItems: [],
              path: "/help",
            },
            {
              item_title: IS_LOGIN ? `Welcome,Omar` : "Sign in",
              childItems: [],
              path: IS_LOGIN ? "/account" : "/signin",
            },
          ],
          last: [],
        },
      },
    ],
  });
  //HANDLE: handle close button method
  let handleCloseIcon = (e) => {
    dispatch(toggleSidebar_Action(false));
    side_ref.current.classList.remove("open");
    dispatch(toggleSidebarOverlay_Action(true));
  };
  //HANDLE: use effect to always listen to open or closed
  useEffect(() => {
    if (IS_OPEN) {
      if (lang == "en") side_ref.current.classList.add("openEn");
      else if (lang == "ar") side_ref.current.classList.add("openAr");
    } else if (IS_OPEN == false) {
      if (lang == "en") side_ref.current.classList.remove("openEn");
      else if (lang == "ar") side_ref.current.classList.remove("openAr");
    }
  }, [IS_OPEN]);
  //HANDLE: click on overlay
  let handleClickOverlay = (e) => {
    dispatch(toggleSidebar_Action(false));
    side_ref.current.classList.remove("open");
    dispatch(toggleSidebarOverlay_Action(true));
  };
  //HANDLE: view more button
  let handleViewMore = (e, items) => {
    if (lang == "en") {
      setISVIEW(true);
    }
  };
  //HANDLE: view less button
  let handleSeeLess = (e, item) => {
    if (lang == "en") {
      setISVIEW(false);
    }
  };
  return (
    <>
      <div
        ref={side_ref}
        // className="customSidebarContainer"
        className={
          lang == "en"
            ? "closeEn customSidebarContainer"
            : "closeAr customSidebarContainer"
        }
        dir={lang == "en" ? "ltr" : "rtl"}
      >
        {/* ---------------------------- START HANDLE: Sidebar content */}
        <div className="customSidebar ">
          <div className="customSidebar__userState d-flex align-items-center justify-content-center">
            {IS_LOGIN ? (
              <Link
                to="/profile"
                className="customSidebar__userLink d-flex align-items-center justify-content-center"
              >
                <div className="userState d-flex align-items-center justify-content-center">
                  <i className="fa-regular fa-circle-user"></i>
                  <p>Hello, Omar</p>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className="customSidebar__userLink d-flex align-items-center justify-content-center"
              >
                <div className="userState d-flex align-items-center justify-content-center">
                  <i className="fa-regular fa-circle-user"></i>
                  <p>Hello, Sign in</p>
                </div>
              </Link>
            )}
          </div>
          <div className="customSidebar__body">
            {sidebar_items.en.map((item, index) => {
              if (item.main_items.last.length > 0) {
                return (
<<<<<<< HEAD
                  <>
                    <SidebarItem item={item} key={index} />
                    {IS_VIEW ? (
=======
                  <div key={index}>
                    <SidebarItem item={item} key={index} />
                    {IS_VIEW && (
>>>>>>> omar
                      <SidebarItem
                        childItems={item.main_items.last}
                        key={index + 1}
                      />
<<<<<<< HEAD
                    ) : (
                      ""
                    )}
                    {!IS_VIEW ? (
                      <button
                        className="customBtn d-flex align-items-center w-100"
                        onClick={(e) => handleViewMore(e, item)}
                      >
                        <p>See All</p>
=======
                    )}
                    {!IS_VIEW ? (
                      <button
                        className="customBtn d-flex align-items-center w-100 py-3"
                        onClick={(e) => handleViewMore(e, item)}
                      >
                        <p className="fs-4 text-primary">See All</p>
>>>>>>> omar
                        <i className="fa-solid fa-angle-down"></i>
                      </button>
                    ) : (
                      <button
<<<<<<< HEAD
                        className="customBtn d-flex align-items-center w-100"
                        onClick={(e) => handleSeeLess(e, item)}
                      >
                        <p>See Less</p>
                        <i className="fa-solid fa-chevron-up"></i>
                      </button>
                    )}
                  </>
                );
              } else {
                return <SidebarItem item={item} />;
=======
                        className="customBtn d-flex align-items-center w-100 py-3"
                        onClick={(e) => handleSeeLess(e, item)}
                      >
                        <p className="fs-4 text-primary">See Less</p>
                        <i className="fa-solid fa-chevron-up"></i>
                      </button>
                    )}
                  </div>
                );
              } else {
                return <SidebarItem item={item} key={index} />;
>>>>>>> omar
              }
            })}
          </div>
        </div>

        {/* ---------------------------- END Sidebar content */}
        {/* ---------------------------- START HANDLE: CLOSE ICON */}
        <i
          className="fa-solid fa-xmark customClose"
          onClick={(e) => handleCloseIcon(e)}
        ></i>
        {/* ---------------------------- END CLOSE ICON */}
      </div>
      <div
        className="sidebarOverlay"
        ref={overlayRef}
        hidden={IS_OVERLAY_OPEN}
        onClick={(e) => handleClickOverlay(e)}
      ></div>
    </>
  );
}
