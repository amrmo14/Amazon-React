import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "./midCart.css";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
export default function MidCart({ products }) {
  let lang = useSelector((select) => select.lang.lang);
  return (
    <div className="midCart" dir={lang == "en" ? "ltr" : "rtl"}>
      <h3 className={lang == "en" ? "midCart__headerEn" : "midCart__headerAr"}>
        {lang == "en" ? "Today's Offer" : "عروض اليوم"}
      </h3>
      <Swiper
        spaceBetween={5}
        navigation={true}
        slidesPerView={6}
        modules={[Navigation]}
        className="midCart__swiper"
        dir="ltr"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index} className="midCart__swiperSlide">
            <Link to={product.path} className="midCart__link">
              <div className="midCart__contaier d-flex flex-column justify-content-between align-items-center">
                <img src={product.img} alt="Today's offer product" />

                {product.discount && lang == "ar" ? (
                  <p className="midCart__swipSlide-pAr">
                    خصم يصل إلي {product.discount} جنية او أقل
                  </p>
                ) : product.discount && lang == "en" ? (
                  <p className="midCart__swipSlide-pEn">
                    Up To {product.discount}EG Off or less
                  </p>
                ) : product.discount_perc && lang == "ar" ? (
                  <p className="midCart__swipSlide-pAr">
                    % خصم يصل إلي {product.discount_perc}
                  </p>
                ) : (
                  <p className="midCart__swipSlide-pEn">
                    Up To {product.discount_perc}% Off
                  </p>
                )}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
