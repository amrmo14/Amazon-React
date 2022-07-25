import React from "react";
import { useEffect, useState ,useContext} from "react";
import { CartContext } from "../context/cartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const{cart,setCart}=useContext(CartContext)
  const[products,setProducts]=useState([])
  const[change,setChange]=useState(1)
  useEffect(() => {
    console.log(cart)
    setProducts(cart)
    console.log(products)
  },[])
  // function addOne(product){
  //   cart.map(item=>
  //     {
  //       if(item.id==product.it){
  //         item.data.quant+= item.data.quant
         
  //       }
  //     })
  // }
  return( <div>
    
    <div className="row justify-content-around">
            <div className="col-2">

            </div>
            <div className="col-10">
            <h2 style={{fontWeight:"bold", padding:'15px',borderBottom:'2px solid grey'}}>Electronics</h2>
            <div className="row justify-content-around electronics">
            {products.map((product, index) => {
                
                    return (
                        <div className=" col-3 p-0 " key={index} >   
                        <div className="card m-3 p-0 " >
                        <Link to={`/productDetails/${product.id}`}  className=" p-0 m-0" >                     
                            <img src={product.data.Img} className="card-img-top p-5 " height={400}  alt="..." />
                            </Link>
                            <div className="card-body ">
                                <Link to={`/productDetails/${product.id}`} style={{color:'black',textDecoration: 'none'}}>
                                     <h3 className="card-title">{product.data.name}</h3> 
                                     </Link>

                                     <h2 className=" text-black"><sup>EGP</sup> {product.data.Price}</h2>
                                     <h2 className=" text-black">Quantity : {product.data.quant}</h2>
                                     {/* <button onClick={()=>addOne(product)}>+</button> */}
                               
                            </div>
                            </div>
                        </div>
    
                    );
                
               
            })}
            </div>
            </div>
          

        </div>

  </div>)
}
