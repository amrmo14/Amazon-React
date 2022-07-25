import React from "react";
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import { db } from "../firebase";
import { Link } from "react-router-dom";
import "./Electronics.css"

const Electronics = () => {
    
    const [products, setProducts] = useState([])
    useEffect(() => {
        const q = query(collection(db, 'products'))
        
        onSnapshot(q, (querySnapshot) => {
        
          setProducts(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
        
      },[])
      console.log(products)
    return ( <>
        <div className="row justify-content-around">
            <div className="col-2">

            </div>
            <div className="col-10">
            <h2 style={{fontWeight:"bold", padding:'15px',borderBottom:'2px solid grey'}}>Electronics</h2>
            <div className="row justify-content-around electronics">
            {products.map((product, index) => {
                if(product.data.CateogryID==8){
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
                               
                            </div>
                            </div>
                        </div>
    
                    );
                }
               
            })}
            </div>
            </div>
          

        </div>
    
    </> );
}
 
export default Electronics;