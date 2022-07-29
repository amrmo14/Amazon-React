import React from 'react';
import './subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../context/stateProvider';
import { getBasketTotal } from '../../store/reducers/basketReducer';

const Subtotal = () => {
    const [{basket},dispatch]=useStateValue();
    return (
        <div className='subtotal'>
            <CurrencyFormat
             renderText={(value)=>(
                <>
                    <p>subtotal ({basket.length} items) : <strong>{value}</strong></p>
                    <small className='subtotal-gift'>
                        <input type="checkbox" />This order contains a gift    
                    </small>    
                </>
             )} 
             decimalScale={2}
             value={getBasketTotal(basket)}
             displayType={"text"}
             thousandSeparator={true}
             prefix={"$"}
             />
             <button>Proceed to checkout</button>
        </div>
    );
}

export default Subtotal;
