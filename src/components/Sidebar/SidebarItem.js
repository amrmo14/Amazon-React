import React from "react";
import "./sidebarItem.css";
import { useHistory } from "react-router-dom";
import toggleNestedSidebar_Action from "./../../store/actions/toggleNestedSidebar";
import { useDispatch, useSelector } from "react-redux";

export default function SidebarItem(props) {
  let { item } = props;
  let { childItems } = props;
  let history = useHistory();
  let dispatch = useDispatch();
  let { isOpen, items } = useSelector((state) => state.toggleNestedSidebar);
  let handleGoToBtn = (e, item) => {
    e.preventDefault();
    if (item.childItems) {
      if (!item.childItems.length) {
        history.push(item.path);
        window.location.reload();
      }
    }
  };

  let handleNestedNavbar = (e, item) => {
    console.log(item);
    dispatch(
      toggleNestedSidebar_Action({
        isOpen: !isOpen,
        items: item.childItems ? item.childItems : [],
      })
    );
    console.log(isOpen, items);
  };

  return (
    <>
      <div className="sidebar__mainItem">
        {item && <h5 className="sidebar__mainItem-title">{item.title}</h5>}

        <ul className="d-flex flex-column align-items-center justify-content-center">
          {item &&
            item.main_items.topFour.map((ChildItem, index) => (
              <li
                className="w-100"
                key={index}
                onClick={(e) => handleNestedNavbar(e, ChildItem)}
              >
                <a
                  href="#"
                  className="d-flex align-items-center"
                  onClick={(e) => handleGoToBtn(e, ChildItem)}
                >
                  <p>{ChildItem.item_title}</p>
                  {item.title == "Help & Setting" ||
                  item.title == "Trending" ||
                  ChildItem.item_title == "Today's Deals" ? (
                    ""
                  ) : (
                    <i className="fa-solid fa-angle-right "></i>
                  )}
                </a>
              </li>
            ))}
          {childItems &&
            childItems.map((item, index) => (
              <li
                className="w-100"
                key={index}
                onClick={(e) => handleNestedNavbar(e)}
              >
                <a href="#" className="d-flex align-items-center ">
                  <p>{item.item_title}</p>
                  <i className="fa-solid fa-angle-right "></i>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
