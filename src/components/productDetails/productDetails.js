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
        onSnapshot(ref, (doc) => {
            setProduct([{
                id: doc.id,
                data: doc.data()
            }])
            console.log("details",)
        })
    }, [])

   async function addToCart(product) {
        // setCart([product.data])
        console.log("p", product)
        if (isUser) {
            console.log(userId)
            try {
                const userDocRef = doc(db, 'users', userId)
                if (cart.length == 0) {
                   await updateDoc(userDocRef, {
                        cart: [...cart, { data: { ...product.data, quant: 1 }, id: product.id }],
                    })
                    console.log("ff", cart)
                }
                else {
                   await updateCart(product)
                }
            } 
            catch (err) {
                alert(err) 
            }
            setShow(true)
            setTimeout(() => setShow(false), 1500)
        }
        else {
            navigate.push("/login")
        }
    }
    const updateCart = async (product) => {
        const userDocRef = await doc(db, 'users', userId)
        console.log("333")
        cart.forEach(item => {
            if (item.id == product.id) {
                item.data.quant = Number(item.data.quant) + 1
                console.log(item.data.quant)
                cart.splice(cart.findIndex((ele) => { return ele.id == item.id }), 1);
                updateFoundedinCart(product,item.data.quant)
            } else {
                console.log("hhhhh")
                updateNotinCart(product)
            }
        })
    }
 
    const updateFoundedinCart = async (product,quant) => {
        const userDocRef = await doc(db, 'users', userId)
       await updateDoc(userDocRef, {
            cart: [...cart, { data: { ...product.data, quant: quant }, id: product.id }]
        })

    }

    const updateNotinCart = async (product) => {
        const userDocRef = await doc(db, 'users', userId)
       await updateDoc(userDocRef, {
            cart: [...cart, { data: { ...product.data, quant: 1 }, id: product.id }]
        })

    }
    return (<>
        <div>
            {product.map((product, index) => {
                return (
                    <div className='row justify-content-center' key={product.id}>
                        <div className="card col-3 m-5 " >
                            <img src={product.data.Img} className="card-img-top" alt="..." />
                            <div className="card-body text-center">
                                <h5 className="card-title">{product.data.name}</h5>
                                <button type="button" className="btn btn-success" onClick={() => addToCart(product)}>add to cart</button>
                                {(show) ?
                                    <div className="alert alert-danger" role="alert">
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