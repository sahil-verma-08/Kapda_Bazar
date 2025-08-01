import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../component/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../component/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateCartQuantity,navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    if (products.length>0){
      
      const tempData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity: cartItems[productId][size]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems,products]);

  const incrementQuantity = (productId, size, currentQuantity) => {
    updateCartQuantity(productId, size, currentQuantity + 1);
  };

  const decrementQuantity = (productId, size, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCartQuantity(productId, size, currentQuantity - 1);
    } else {
      updateCartQuantity(productId, size, 0);
    }
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1="YOUR" text2="Cart" />
      </div>

      <div>
        {cartData.length === 0 ? (
          <p className='text-center text-gray-500'>Your cart is empty.</p>
        ) : (
          cartData.map((item) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;

            return (
              <div key={`${item._id}-${item.size}`} className='py-4 border-t border-b border-blue-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border border-blue-700 bg-blue-200'>{item.size}</p>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-2 border max-w-[120px] px-2 py-1 rounded bg-blue-100'>
                  <button className='px-2 text-xl' onClick={() => decrementQuantity(item._id, item.size, item.quantity)}>-</button>
                  <span className='px-3'>{item.quantity}</span>
                  <button className='px-2 text-xl' onClick={() => incrementQuantity(item._id, item.size, item.quantity)}>+</button>
                </div>

                <img
                  onClick={() => updateCartQuantity(item._id, item.size, 0)}
                  className='w-4 sm:w-5 cursor-pointer hover:scale-110 transition'
                  src={assets.bin_icon}
                  alt='Remove from cart'
                />
              </div>
            );
          })
        )}
      </div>
     <hr className='border border-blue-550'/>
      <div className='flex justify-end my-10 sm:mx-20 '>
        <div className='w-full sm:w-[600px]'>
          <CartTotal />
          <div className='w-full text-end '>
            <button onClick={()=>navigate('/placeorder')} className='bg-blue-800 text-white text-sm my-8 px-8 py-3'> PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
