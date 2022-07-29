import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { collection, query, orderBy, onSnapshot, doc, getDoc, documentId } from "firebase/firestore"
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { db } from "../firebase";
import { UserContext } from '../context/userContext';
import { updateDoc } from "firebase/firestore";
import { CartContext } from '../context/cartContext';

const ProductDetails = (props) => {

    const { isUser, userId, setUserId, setIsUser } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext)
    const params = useParams();
    const [product, setProduct] = useState([])
    const navigate = useHistory();
    let [show, setShow] = useState(false)


    useEffect(() => {
        const ref = doc(db, "products", params.id)
        const userDocRef = doc(db, 'users', '5xxvgWdGkQF0xtVn29kh')
        // getDoc(ref).then((doc)=>setProduct(doc.data()))
        onSnapshot(ref, (doc) => setProduct([{
            id: doc.id,
            data: doc.data()
        }]))
        // setCart([...cart])
        //     if(isUser){

        //     onSnapshot(userDocRef, (doc) => {

        //         console.log("gggg",)
        //         setCart([...doc.data().cart]
        //         )
        //     }

        //    )
        //     }
        //     else{
        //         setCart([])
        //     }
        // console.log(...cart)

    }, [])

    function addToCart(product) {
        // setCart([product.data])
        console.log(product)
        if (isUser) {
            const userDocRef = doc(db, 'users', userId)

            try {
                if (cart.length == 0) {
                    updateDoc(userDocRef, {
                        cart: [...cart, { data: { ...product.data, quant: 1 }, id: product.id }],
                    })
                    console.log("ff", cart)
                }
                else {
                    cart.map(item => {
                        console.log("it", item)
                        if (item.id == product.id) {
                            item.data.quant = Number(item.data.quant) + 1
                            console.log(item.data.quant)
                            cart.splice(cart.findIndex((ele) => { return ele.id == item.id }), 1);
                            updateDoc(userDocRef, {
                                cart: [...cart, { data: { ...product.data, quant: item.data.quant }, id: product.id }],
                            })
                        }
                        else {
                            updateDoc(userDocRef, {
                                cart: [...cart, { data: { ...product.data, quant: 1 }, id: product.id }],
                            })
                        }
                    })
                }

                console.log(cart)

            } catch (err) {
                alert(err)
            }

            setShow(true)
            setTimeout(()=>setShow(false), 1500)


        }
        else {
            navigate.push("/login")
        }

    }


    return (<>
        <div>
            {product.map((product, index) => {
                return (
                    <div className='row justify-content-center' key={product.id}>
                        <div className="card col-3 m-5 " >
                            <img src={product.data.Img} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{product.data.name}</h5>
                                <button onClick={() => addToCart(product)}>add to cart</button>
                                {(show) ? 
                                <div class="alert alert-danger" role="alert">
                                product added to cart.
                              </div>
                                : <div></div>}

                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    </>);
}

export default ProductDetails;