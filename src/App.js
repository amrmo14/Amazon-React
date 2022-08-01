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
import Electronics from "./components/electronics/Electronics";
import ProductDetails from "./components/productDetails/productDetails";
import Login from "./components/login/Login";
import { UserProvider } from "./components/context/userContext";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import { CartContext, CartProvider } from "./components/context/cartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./pages/payment/Payment";
import AddProduct from "./pages/seller_addProduct/AddProduct";
import SellerLogin from "./pages/seller_login/SellerLogin";
import sellerSignUp from "./pages/seller_signup/SellerSignup";
import SellerDashboard from "./pages/sellerDashboard/SellerDashboard";
import PrivateRoute from "./components/RedirectWrapper/RedirectWrapper";
import AccountInfo from "./pages/AccountInfo/AccountInfo";
let stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
function App() {
  let dispatch = useDispatch();
  let [lang, setLang] = useState("en");
  const [isUser,setIsUser]=useState(false)
  const[cart,setCart]=useState([])
  const[userId,setUserId]=useState("")
  let handleChangeLang = (e) => {
    setLang(e.target.value);
    console.log(e.target.value);
    dispatch(lang_action(lang));
  };
  return (
    <>
      <Elements stripe={stripePromise}>
        <Provider store={store}>
      <Router>
        <UserProvider value={{isUser,userId,setIsUser,setUserId}}>
          <CartProvider value={{cart,setCart}}>
        <Header />
        <Navbar />
        <div className="container-fluid  appContainer">
          <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/cart" exact component={Cart}  />
          <Route path="/seller/:id" exact component={AddProduct} />
                <Route path="/sellerLogin" exact component={SellerLogin} />
                <Route path="/sellerSignup" exact component={sellerSignUp} />

            <Route path="/electronics" exact component={Electronics}  />
            <Route path="/productDetails/:id" component={ProductDetails} />
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
            <Route path="/" exect component={Home} />
          </Switch>
        </div>
        <Footer />
        </CartProvider>
        </UserProvider>
        
      </Router>
      </Provider>
      </Elements>
</>
)
}

export default App;
