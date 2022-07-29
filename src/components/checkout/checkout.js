import React from 'react';
import './checkout.css';
import Subtotal from '../subtotal/subtotal';
import { useStateValue } from '../context/stateProvider';
import CheckoutProduct from '../checkoutProduct/checkoutProduct';

const Checkout = () => {
    const [{basket}, dispatch]=useStateValue();
    return (
        <div className='checkout'>
            <div className='checkout-left'>
                <img src="https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/logos/OG_image_Squid_Ink.png" alt="ad" className='checkout-ad'/>
                <div>
                    <h2 className='checkout-title'>Your shopping basket</h2>
                    {basket.map((item) => {
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}/>
                    })}
                </div>
            </div>
            <div className='checkout-right'>
                <Subtotal />
                
            </div>
        </div>
    );
}

export default Checkout;
