import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import lang_action from "./store/actions/lang";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Electronics from "./pages/electronics/Electronics";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./pages/payment/Payment";
let stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
function App() {
  // let dispatch = useDispatch();
  // let [lang, setLang] = useState("en");
  // let handleChangeLang = (e) => {
  //   setLang(e.target.value);
  //   console.log(e.target.value);
  //   dispatch(lang_action(lang));
  // };

  return (
    <>
      <Elements stripe={stripePromise}>
        <Router>
          <Header />
          <Navbar />
          <div className="container-fluid px-5 appContainer">
            <Switch>
              <Route path="/electronics" component={Electronics} exact />
              <Route path="/electronics/:id" component={ProductDetails} exact />
              <Route path="/cart" exact component={Cart} />
              <Route path="/payment/:id" exact component={Payment} />
              <Route path="/" component={Home} exect />
            </Switch>
          </div>
          <Footer />
        </Router>
      </Elements>
    </>
  );
}

export default App;
