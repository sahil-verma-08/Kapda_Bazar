import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from './Title'
import ProductList from './ProductList';

const BestSeller = () => {
    const {products}=useContext(ShopContext);
    const [bestSeller,setbestseller]=useState([]);

    useEffect(()=>{
         const bestProduct= products.filter((item)=>(item.bestseller));
         setbestseller(bestProduct.slice(0,5))
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLER'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
  Discover the most popular products our customers love — handpicked for quality, value, and satisfaction.
</p>

        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            bestSeller.map((item,index)=>(
              <ProductList key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
            ))
          }

        </div>
    </div>
  )
}

export default BestSeller