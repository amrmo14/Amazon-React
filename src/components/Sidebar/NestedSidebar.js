import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./nestedSidebar.css";

export default function NestedSidebar() {
  let { items } = useSelector((state) => state.toggleNestedSidebar);
  return (
    <div className="nestedSidebar sidebar__mainItem">
      <ul className="d-flex flex-column align-items-center justify-content-center">
        {items.map((item, index) => {
          return (
            <li className="w-100" key={index}>
              <Link
                to={item.path}
                className="d-flex align-items-center customLink"
              >
                <p>{item.item_title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
