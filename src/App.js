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
import Electronics from "./components/electronics/Electronics";
import ProductDetails from "./components/productDetails/productDetails";
import Login from "./components/login/Login";
import { UserProvider } from "./components/context/userContext";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import { CartContext, CartProvider } from "./components/context/cartContext";
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
            <Route path="/electronics" exact component={Electronics}  />
            <Route path="/productDetails/:id" component={ProductDetails} />
            <Route path="/" exect component={Home} />
          </Switch>
        </div>
        <Footer />
        </CartProvider>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
