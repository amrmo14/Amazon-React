import React from 'react';
import './checkoutProduct.css'

const CheckoutProduct = (id,image,title) => {
    return (
        <div className='checkoutProduct'>
            <img src={image} alt="" className='checkoutProduct-image'/>
            <div className='checkoutProduct-info'>
                <p className='checkoutProduct-title'>{title}</p>
                <button>Remove from Basket</button>
            </div>
        </div>
    );
}

export default CheckoutProduct;
