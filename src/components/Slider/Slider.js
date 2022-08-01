import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "./slider.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Slider() {
  let lang = useSelector((state) => state.lang.lang);
  let [sliders, setSliders] = useState([
    {
      img: {
        en: require("./../../assets/slider/computers_en.png"),
        ar: require("./../../assets/slider/computers_ar.png"),
        path: "/computers",
      },
    },
    {
      img: {
        en: require("./../../assets/slider/beach_en.png"),
        ar: require("./../../assets/slider/beach_ar.png"),
        path: "/mensClothes",
      },
    },
    {
      img: {
        en: require("./../../assets/slider/summer_en.png"),
        ar: require("./../../assets/slider/summer_ar.png"),
        path: "/womenClothes",
      },
    },
  ]);

  return (
    <div className="cutomSwiper">
      <div className="customSwiper__overlay"></div>
      <Swiper
        slidesPerView={1}
        navigation={true}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
      >
        {sliders.map((slider, index) =>
          lang == "en" ? (
            <SwiperSlide>
              <Link to={slider.path}>
                <img src={slider.img.en} />
              </Link>
            </SwiperSlide>
          ) : (
            <SwiperSlide>
              <Link to={slider.path}>
                <img src={slider.img.ar} />
              </Link>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
    // <></>
  );
}
