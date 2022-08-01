import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="row bg-dark  footer">
        <div className="m-0 ">
          <a href="#header" className="backToTop">
            <div className="footerBack text-light text-center">
              <p className="py-4 m-0">Back to top</p>
            </div>
          </a>
        </div>

        <div className="text-light footerAbout py-5 m-0">
          <div className="row justify-content-center">
            <div className="col-2">
              <div className="">
                <h4>Get to Know Us</h4>
              </div>
              <ul className="list-unstyled">
                <li className="">
                  <a href="/-/en/b?node=22624915031" className="">
                    About Amazon
                  </a>
                </li>
                <li>
                  <a href="http://amazon.jobs" className="">
                    Careers
                  </a>
                </li>
                <li className="">
                  <a href="https://www.amazon.science" className="">
                    Amazon Science
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-2">
              <div className="">
                <h4>Shop with Us</h4>
              </div>
              <ul className="list-unstyled">
                <li className="">
                  <a
                    href="https://www.amazon.eg/-/en/gp/css/homepage.html?ref_=footer_ya"
                    className=""
                  >
                    Your Account
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.amazon.eg/-/en/gp/css/order-history?ref_=footer_yo"
                    className=""
                  >
                    Your Orders
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.amazon.eg/-/en/a/addresses?ref_=footer_yad"
                    className=""
                  >
                    Your Addresses
                  </a>
                </li>
                <li className="">
                  <a
                    href="/-/en/gp/regisdivy/wishlist?requiresSignIn=1&amp;ref_=footer_wl"
                    className=""
                  >
                    Your Lists
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-2">
              <div className="">
                <h4>Make Money with Us</h4>
              </div>
              <ul className="list-unstyled">
                <li className="">
                  <a
                    href="https://sell.amazon.eg/beginners-guide.html?lang=en-US&amp;ref_=AZEGSOA_footer_sell_EN&amp;ld=AZEGSOA_footer_sell_EN"
                    className=""
                  >
                    Sell on Amazon
                  </a>
                </li>
                <li className="">
                  <a
                    href="https://sell.amazon.eg/fulfillment-by-amazon.html?lang=en-US&amp;ref_=AZEGSOA_footer_FBA_EN&amp;ld=AZEGSOA_footer_FBA_EN"
                    className=""
                  >
                    Fulfillment by Amazon
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-2">
              <div className="">
                <h4>Let Us Help You</h4>
              </div>
              <ul className="list-unstyled">
                <li className="">
                  <a
                    href="/-/en/gp/help/customer/display.html?nodeId=508510"
                    className=""
                  >
                    Help
                  </a>
                </li>
                <li>
                  <a
                    href="/-/en/gp/help/customer/display.html?nodeId=201910060&amp;ref_=footer_shiprates"
                    className=""
                  >
                    Shipping &amp; Delivery
                  </a>
                </li>
                <li>
                  <a href="/-/en/spr/returns" className="">
                    Returns &amp; Replacements
                  </a>
                </li>
                <li className="">
                  <a href="/-/en/b?node=22624924031" className="">
                    Amazon App Download
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footerSell row justify-content-center ">
          <div className="my-0 col-6">
            <div className="row py-5">
              <div className="col-3">
                <a
                  href="https://sell.amazon.ae/?lang=en-US&amp;ref_=AZEGSOA_footer_affiliateAE_EN&amp;ld=AZEGSOA_footer_affiliateAE_EN"
                  className=""
                >
                  <h4>Sell on Amazon.AE</h4>
                  <p className="">Sell globally, start with UAE</p>
                </a>
              </div>

              <div className="col-3">
                <a
                  href="https://sell.amazon.sa/?lang=ar-AE&amp;ref_=AZEGSOA_footer_affiliateSA_EN&amp;ld=AZEGSOA_footer_affiliateSA_EN"
                  className=""
                >
                  <h4>Sell on Amazon.Sa</h4>
                  <p className="">Sell globally, start with Saudi Arabia</p>
                </a>
              </div>

              <div className="col-2">
                <a
                  href="https://aws.amazon.com/what-is-cloud-computing/?sc_channel=EL&amp;sc_campaign=AE_amazonfooter"
                  className=""
                >
                  <h4>Amazon Web Services</h4>
                  <p className="m-0">Scalable Cloud</p>
                  <p> Computing Services</p>
                </a>
              </div>

              <div className="col-2">
                <a href="https://www.goodreads.com/" className="">
                  <h4>Goodreads</h4>
                  <p className="m-0">Book reviews</p>
                  <p> &amp; recommendations</p>
                </a>
              </div>

              <div className="col-2">
                <a href="https://www.audible.com/" className="">
                  <h4>Audible</h4>
                  <p className="m-0">DownloadAudio</p>
                  <p> Books</p>
                </a>
              </div>
            </div>
            <div>
              <div>&nbsp;</div>
            </div>
            <div className="row ">
              <div className="col-3">
                <a href="https://www.imdb.com/" className="">
                  <h4>IMDb</h4>
                  <p className="m-0">Movies, TV </p>
                  <p>&amp; Celebrities</p>
                </a>
              </div>

              <div className="col-3">
                <a href="http://www.alexa.com/" className="">
                  <h4>Alexa</h4>
                  <p className="m-0">Actionable Analytics</p>
                  <p> for the Web</p>
                </a>
              </div>

              <div className="col-2">
                <a href="http://www.bookdepository.com/" className="">
                  <h4>Book Depository</h4>
                  <p className="m-0">Books With Free</p>
                  <p>Delivery Worldwide </p>
                </a>
              </div>

              <div className="col-2">
                <a href="http://www.shopbop.com/welcome" className="">
                  <h4>Shopbop</h4>
                  <p className="m-0">Designer</p>
                  <p> Fashion Brands</p>
                </a>
              </div>

              <div className="">&nbsp;</div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center text-light pb-5">
          <ul className=" col-5 list-group list-group-horizontal bg-dark">
            <li className="d-block p-3">
              <a
                href="/-/en/gp/help/customer/display.html?nodeId=201909000&amp;ref_=footer_cou"
                className=""
              >
                Conditions of Use &amp; Sale
              </a>
            </li>
            <li className="d-block p-3">
              <a
                href="/-/en/gp/help/customer/display.html?nodeId=201909010&amp;ref_=footer_privacy"
                className=""
              >
                Privacy Notice
              </a>
            </li>
            <li className="d-block p-3">
              <a
                href="/-/en/gp/help/customer/display.html?nodeId=202075050&amp;ref_=footer_ads"
                className=""
              >
                Interest-Based Ads
              </a>
            </li>
            <li className="d-block p-3">
              ©1996–2022, Amazon.com, Inc. or its affiliates
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
