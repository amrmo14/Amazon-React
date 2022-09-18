import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import store from "./store/store/store";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Navbar from "./components/Navbar/Navbar";
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
import EditProduct from "./pages/editProduct/EditProduct";
import Category from "./pages/category/Category";
import UserSignUp from "./pages/UserSignUp/UserSignUp";
import UserDashboard from "./pages/userDashboard/UserDashboard";
import Purchases from "./pages/purchases/Purchases";
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
                {/* <Route path="/electronics" component={Electronics} exact /> */}
                <Route path="/category/:category" component={Category} exact />
                <Route path="/product/:id" component={ProductDetails} exact />
                <PrivateRoute path="/cart" exact component={Cart} />
                <PrivateRoute path="/seller/:id" exact component={AddProduct} />
                <Route path="/signup" exact component={UserSignUp} />
                <Route path="/sellerLogin" exact component={SellerLogin} />
                <Route path="/sellerSignup" exact component={sellerSignUp} />
                <Route path="/user" exact component={UserDashboard} />
                <Route path="/mobile" exact component={Mobile} />
                <Route path="/purchase" exact component={Purchases} />
                <PrivateRoute
                  path="/editProduct/:productID"
                  exact
                  component={EditProduct}
                />
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
