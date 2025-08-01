import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const { currency, delivery_fee = 0, getCartAmount } = useContext(ShopContext);
    const cartAmount = getCartAmount();
    const totalAmount = cartAmount === 0 ? 0 : cartAmount + delivery_fee;

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1='CART' text2='TOTALS' />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {cartAmount.toFixed(2)}</p>
                </div>
                <hr className='border border-blue-950' />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee.toFixed(2)}</p>
                </div>
                <hr className='border border-blue-950' />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {totalAmount.toFixed(2)}</b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;
