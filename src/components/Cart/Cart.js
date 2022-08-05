import React from "react";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/cartContext";
import { Link } from "react-router-dom";
import { collection, query, orderBy, onSnapshot, doc, getDoc, documentId } from "firebase/firestore"
import { db } from "../firebase";
import { UserContext } from "../context/userContext";
import { updateDoc } from "firebase/firestore";



export default function Cart() {
  const { cart, setCart } = useContext(CartContext)
  const [products, setProducts] = useState([])
  const [alert, setalert] = useState(false)
  const { isUser, userId, setUserId, setIsUser } = useContext(UserContext);
  let Total = 0
  let cartTotal = 0
  const [totalPrice, setTotalPrice] = useState([])

  // const[change,setChange]=useState(1)
  useEffect(() => {
    console.log(cart)
    setProducts(cart)
    setTimeout(() => console.log(products), 1000)
  }, [cart])
  // function addOne(product){
  //   cart.map(item=>
  //     {
  //       if(item.id==product.it){
  //         item.data.quant+= item.data.quant

  //       }
  //     })
  // }
  const updateCart = async () => {
    const userDocRef = doc(db, 'users', userId)
    try {
      await updateDoc(userDocRef, {
        cart: [...cart]
      })
    } catch (err) {
      alert(err)
    }
  }

  const removeFromCart = async (product) => {
    const userDocRef = doc(db, 'users', userId)
    console.log("remove")
    cart.forEach(item => {
      if (item.id == product.id) {
        cart.splice(cart.findIndex((ele) => { return ele.id == item.id }), 1);
        updateCart()

      }
    })
  }
  const removeOne = async (product) => {
    const userDocRef = doc(db, 'users', userId)
    console.log("removeOne")
    cart.forEach(item => {
      if (item.id == product.id) {
        if (product.data.quant == 1) {
          cart.splice(cart.findIndex((ele) => { return ele.id == item.id }), 1);
          setCart([...cart])
          updateDoc(userDocRef, {
            cart: [...cart]
          })
        }
        else {
          let quant = product.data.quant - 1
          // cart.splice(cart.findIndex((ele) => { return ele.id == item.id }), 1);
          let index = cart.findIndex((ele) => { return ele.id == item.id })
          cart[index] = { data: { ...product.data, quant: quant }, id: product.id }
          setCart([...cart])
          updateDoc(userDocRef, {
            cart: [...cart]
          })
          // setCart([...cart, { data: { ...product.data, quant: quant }, id: product.id }])
          // updateDoc(userDocRef, {
          //   cart: [...cart, { data: { ...product.data, quant: quant }, id: product.id }]
          // })
        }
      }
    })
  }

  const addOne = async (product) => {
    const userDocRef = doc(db, 'users', userId)
    console.log("addOne")
    cart.forEach(item => {
      if (item.id == product.id) {
        if (product.data.quant == product.data.Quantity) {
          setalert(true)
          setTimeout(() => setalert(false), 1500)
        }
        else {
          let quant = product.data.quant + 1
          // cart.splice(cart.findIndex((ele) => { return ele.id == item.id }), 1);
          let index = cart.findIndex((ele) => { return ele.id == item.id })
          cart[index] = { data: { ...product.data, quant: quant }, id: product.id }
          // setCart([...cart, { data: { ...product.data, quant: quant }, id: product.id }])
          setCart([...cart])
          updateDoc(userDocRef, {
            cart: [...cart]
          })
        }
      }
    })
  }
  return (<div>

    <div className="row justify-content-around">

      <div className="col-10">
        <h2 style={{ fontWeight: "bold", padding: '15px', borderBottom: '2px solid grey' }}>My Cart</h2>
        {(alert) ? <div class="alert alert-danger" role="alert">
          Max Quantity Available
        </div>
          : <div></div>}
        <div className="row justify-content-around electronics">

          {products.map((product, index) => {
            Total = product.data.Price * product.data.quant
            cartTotal += Total
            return (
              <div className=" col-2 p-0 " key={index} >
                <div className="card m-3 p-0 h-100" >
                  <Link to={`/productDetails/${product.id}`} className=" p-0 m-0" >
                    <img src={product.data.imgs[0]} className="card-img-top p-5 " height={300} alt="..." />
                  </Link>
                  <div className="card-body ">
                    <Link to={`/productDetails/${product.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                      <h5 
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display:"-webkit-box",
                        WebkitLineClamp:"2",
                        WebkitBoxOrient:"vertical"
                    }}
                      className="card-title">{product.data.en.name}</h5>
                    </Link>

                    <h2 className=" text-black"><sup>EGP</sup> {product.data.Price}</h2>
                    <h4 className=" text-black">Quantity : {product.data.quant}</h4>
                    <h4 className=" text-black">Total price: <sup>EGP</sup>
                      {Total}</h4>
                    <div className="row justify-content-around">
                      <button type="button" className="btn btn-warning col-2" onClick={() => removeOne(product)}>-</button>
                      <button type="button" className="btn btn-danger col-6" onClick={() => removeFromCart(product)}>remove</button>

                      <button type="button" className="btn btn-success col-2" onClick={() => addOne(product)}>+</button>
                    </div>

                  </div>
                </div>
              </div>

            );


          }


          )}

        </div>
        {(cart.length > 0) ?
          <div>
            <p style={{ fontSize: '5rem', padding: '30px', borderTop: "2px solid grey", marginTop: "50px" }}>
              Total = EGP {cartTotal}
              <a href="#"><button type="submit"
                style={{ float: "right", cursor: "pointer", padding: "10px", fontSize: "5rem", backgroundColor: "orange", borderRadius: "5px" }}
              >
                Payment</button></a> </p>
          </div> : <div></div>}
      </div>

      <div className="col-2">

      </div>

    </div>

  </div>)
}
