import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store/store";
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
import AddProduct from "./pages/seller_addProduct/AddProduct";
import login from "./pages/login/login";
import SellerLogin from "./pages/seller_login/SellerLogin";
import sellerSignUp from "./pages/seller_signup/SellerSignup";
import SellerDashboard from "./pages/sellerDashboard/SellerDashboard";
import PrivateRoute from "./components/RedirectWrapper/RedirectWrapper";
import AccountInfo from "./pages/AccountInfo/AccountInfo";
import Mobile from "./pages/categories/mobile/Mobile";
import ProductsDashboard from "./pages/ProductsDashboard/ProductsDashboard";
let stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <Provider store={store}>
          <Router>
            <Header />
            <Navbar />
            <div className="container-fluid px-5 appContainer">
              <Switch>
                <Route path="/electronics" component={Electronics} exact />
                <Route
                  path="/electronics/:id"
                  component={ProductDetails}
                  exact
                />
                <Route path="/cart" exact component={Cart} />
                <Route path="/seller/:id" exact component={AddProduct} />
                <Route path="/sellerLogin" exact component={SellerLogin} />
                <Route path="/sellerSignup" exact component={sellerSignUp} />
                <Route path="/mobile" exact component={Mobile} />
                <PrivateRoute
                  path="/:id/productsDashboard"
                  exact
                  component={ProductsDashboard}
                />
                <PrivateRoute
                  path="/sellerDashboard"
                  exact
                  component={SellerDashboard}
                />
                <PrivateRoute path="/payment/:id" exact component={Payment} />
                <PrivateRoute
                  path="/accountInfo"
                  exact
                  component={AccountInfo}
                />
                <Route path="/login" exact component={login} />
                <Route path="/" component={Home} exect />
              </Switch>
            </div>
            <Footer />
          </Router>
        </Provider>
      </Elements>
    </>
  );
}

export default App;
