import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "./smallCart.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function SmallCart({ products, title_en, title_ar }) {
  let lang = useSelector((state) => state.lang.lang);
  return (
    <div className="smallCart" dir={lang == "en" ? "ltr" : "rtl"}>
      <h3
        className={
          lang == "en" ? "midCart__headerEn py-4" : "midCart__headerAr py-4"
        }
      >
        {lang == "en" ? title_en : title_ar}
      </h3>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={6}
        spaceBetween={30}
        dir="ltr"
      >
        {lang == "en" &&
          products.en.map((product, index) => (
            <SwiperSlide key={index}>
              <Link to={product.path}>
                <img src={product.img} />
              </Link>
            </SwiperSlide>
          ))}
        {lang == "ar" &&
          products.ar.map((product, index) => (
            <SwiperSlide key={index}>
              <Link to={product.path}>
                <img src={product.img} />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
