import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import "./bigCart.css";
import { useStateValue } from "../context/stateProvider";


export default function BigCart(props) {
  let { product ,id,title,image,price} = props;
  let prodImg = product.image;
  let lang = useSelector((select) => select.lang.lang);
  console.log(lang);


  const [{basket},dispatch]=useStateValue();
  console.log("this is basket", basket)
  const addToBasket =()=>{
    dispatch({
      type:'ADD_TO_BASKET',
      item:{
        id,
        title,
        image,
        price
    
      }
    })
  }
  return (
    <>
      <div className='col-3 mt-4' dir={lang == "en" ? "ltr" : "rtl"}>


        <div className="card m-1 customBigCart" >
          <div className="">
            <h4 className={
              lang == "en" ? "customBigCart__head-en" : "customBigCart__head-ar"
            }> {lang == "en" ? product.title.en : product.title.ar}</h4>
            <p
              className={lang == "en" ? "customBigCart__en" : "customBigCart__en"}
            >
              {product.discount
                ? lang == "en"
                  ? `| Up to ${product.discount}% off `
                  : `| خصـم حتي %${product.discount}`
                : ""}
            </p>
          </div>
          <div className="">
            <div className="">
              <Link to={product.path} className="w-100 p-0 m-0 img__link">
                <img src={prodImg} alt="product image" className="p-0 m-0 " />
              </Link>
            </div>
          </div>
          <div className="a-cardui-footer">
            {/* <a
              className={lang == "en" ? "customBigCart__en" : "customBigCart__ar"}
              href={product.path}
            >
              {lang == "en" ? "Shop now" : "تسوق الان"}
            </a> */}
            <button
              className={lang == "en" ? "customBigCart__en" : "customBigCart__ar"}
              onClick={addToBasket}
              
            >
              {lang == "en" ? "Add To Basket" : " أضف الى السلة "}
            </button>
            
            
          </div>
        </div>
      </div>

    </>
  );
}
