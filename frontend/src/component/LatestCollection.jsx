import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductList from './ProductList';

const LatestCollection = () => {

     const {products}= useContext(ShopContext);
     const [latestProducts,setLatestProducts]=useState([]);

     useEffect(()=>{
         setLatestProducts(products.slice(0,10));
     },[products])

    

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
  A fresh collection you’ve never tried before — new in the market and already making waves!
</p>


        </div>
      
      {/* Randering product  */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestProducts.map((item,index)=>(
                <ProductList key={index} id={item._id}  image={item.image} name={item.name} price={item.price} / >
            ))
        }

      </div>
    

    </div>
  )
}

export default LatestCollection