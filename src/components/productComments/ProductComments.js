import React, { useEffect, useState } from "react";
import LocalizedStrings from "react-localization";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import {
  addProductComment,
  getProductComments,
} from "../../firebase/products/products";
import { getSeller } from "../../firebase/seller/sellers";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./productComments.css";
export default function ProductComments() {
  let pageData = new LocalizedStrings({
    en: {
      title: "Comments",
      login: "Login to comment",
      comment: "What's your opioion about the product",
      rate: "Please rate the product",
      add: "Add Comment",
    },
    ar: {
      title: "التعليقات",
      login: "سجل الدخول لتتمكن من التعليق",
      comment: "ماهو تعليقك علي المنتج",
      rate: "من فضلك قيم المنتج",
      add: "اضف التعليق",
    },
  });
  let lang = useSelector((state) => state.lang.lang);
  let [rate, setRate] = useState(0);
  let [rateHover, setrateHover] = useState(0);
  let [comment, setComment] = useState("");
  let [comments, setComments] = useState([]);
  let date = new Date().toLocaleString();
  let starsArr = new Array(5).fill(0);
  let { id } = useParams();
  pageData.setLanguage(lang);
  let docRef = doc(db, "products", id);
  //HANDLE: use Effect
  useEffect(() => {
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, []);

  let handleCommentChange = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };
  //START HANDLE: rate
  let handleRateClick = (index) => {
    setRate(index);
    console.log(rate);
  };
  let hanldleMouseOverRate = (index) => {
    setrateHover(index);
  };
  let handleMouseLeaveRate = () => {
    setrateHover(0);
  };
  let handleAddComment = (prodId) => {
    getSeller(localStorage.getItem("userId")).then((user) => {
      addProductComment(prodId, {
        rate,
        comment,
        date,
        userName: user.name,
      }).then((snapShot) => {
        setComment("");
        setRate(0);
      });
    });
  };
  //END HANDLE: rate
  return (
    <>
      <div className="productComments w-100" dir={lang == "en" ? "ltr" : "rtl"}>
        <h2 className="mb-5">{pageData.title}</h2>
        {/* HANDLE: display comments and rating*/}
        {comments ? (
          comments.map((userComment, index) => (
            <div className="d-flex flex-column align-items-start" key={index}>
              <div className="d-flex flex-column align-items-start user__box w-100">
                <div className="w-100 d-flex align-items-center justify-content-between mb-3 w-100">
                  <h5 className="m-0 fs-4 user__name">
                    {userComment.userName}
                  </h5>
                  <div className="p-0 m-0">
                    {starsArr.map((star, index) => (
                      <i
                        className={`fa-solid fa-star p-0 m-0 fs-6 ${
                          userComment.rate > index ? "star-main" : "star-grey"
                        }`}
                        key={index}
                      ></i>
                    ))}
                  </div>
                </div>
                <p className="user__comment w-100">{userComment.comment}</p>
                <p className="user__date align-self-end">{userComment.date}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        {/* HANDLE: add new comment and rating */}
        {localStorage.getItem("token") ? (
          <div className="productComment__commentBox ">
            <div className="productComment__commentRate d-flex align-items-center justify-content-between mb-3">
              <h3>{pageData.rate}</h3>
              <div>
                {starsArr.map((star, index) => (
                  <i
                    className={`fa-solid fa-star productComment__star ${
                      rate > index || rateHover > index
                        ? "star-main"
                        : "star-grey"
                    }`}
                    key={index}
                    onClick={() => handleRateClick(index + 1)}
                    onMouseOver={() => hanldleMouseOverRate(index + 1)}
                    onMouseLeave={handleMouseLeaveRate}
                  ></i>
                ))}
              </div>
            </div>
            <textarea
              className="productComment__commentBox-commentInput w-100"
              placeholder={pageData.comment}
              value={comment}
              onChange={(e) => handleCommentChange(e)}
            />
            <button
              className="btn btn-primary productComment__Btn d-block mt-3"
              onClick={() => {
                handleAddComment(id);
              }}
            >
              {pageData.add}
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center ">
            <button className="btn btn-primary productComment__Btn">
              {pageData.login}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
