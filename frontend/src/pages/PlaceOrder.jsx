import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [method,setmethod]=useState('cod');
  const {navigate}= useContext(ShopContext)
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>


      {/* left side  */}


      <div className='flex-flex-col gap-4 mx-2 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />

        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-500 bg-blue-100 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name' />
          <input className='border  border-gray-500 bg-blue-100  rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
        </div>
        <input className='border  border-gray-500 bg-blue-100  rounded my-2 py-1.5 px-3.5 w-full' type='email' placeholder='email@gmail.com' />
        <input className='border  border-gray-500 bg-blue-100  rounded my-2 py-1 px-3.5 w-full' type='text' placeholder='Street' />
        <div className='flex gap-3'>
          <input className='border border-gray-500 bg-blue-100 my-2 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
          <input className='border  border-gray-500 bg-blue-100 my-2 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-500 bg-blue-100 my-2 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zipcode' />
          <input className='border  border-gray-500 bg-blue-100 my-2  rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
        </div>
        <input className='border border-gray-500 bg-blue-100 my-2 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone' />

      </div>

      {/* right Side  */}

      <div className='mt-8 sm:mx-20 w-full sm:max-w-[500px] lg:max-w-[600px]'>

        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={"METHOD"} />

          {/* payment method selection  */}

          <div className='flex gap-3 flex-col lg:flex-row'>
         <div onClick={()=>setmethod('strip')} className='flex items-center gap-3 border border-blue-800 p-2 px-3 cursor-pointer'>
          <p className={`min-w-3 h-3.5 border border-blue-500 rounded-full ${method==='strip'?'bg-blue-700'  :"" } `}></p>
            <img className='h-5 mx-4  ' src={assets.stripe_logo} alt=''/>
            
          
         </div>
         <div onClick={()=>setmethod('razorpay')} className='flex items-center gap-3 border border-blue-800 p-2 px-3 cursor-pointer'>
          <p className={`min-w-3 h-3.5 border border-blue-500 rounded-full ${method==='razorpay'?'bg-blue-700' :''}`}></p>
            <img className='h-5 mx-4  ' src={assets.razorpay_logo} alt=''/>
            
          
         </div>
         <div onClick={()=>setmethod('upi')} className='flex items-center gap-3 border border-blue-800 p-2 px-3 cursor-pointer'>
          <p className={`min-w-3 h-3.5 border border-blue-500 rounded-full ${method==='upi' ? 'bg-blue-700'  : ''}`}></p>
            <img className='h-5 mx-4  ' src={assets.upi_logo} alt=''/>
            
          
         </div>
         <div onClick={()=>setmethod('cod')} className='flex items-center gap-3 border border-blue-800 p-2 px-3 cursor-pointer'>
          <p className={`min-w-3 h-3.5 border border-blue-500 rounded-full ${method==='cod'? 'bg-blue-700' :''}`}></p>
          <p className='text-blue-800 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>            

         </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button onClick={()=> navigate('/orders')} className='bg-blue-800 text-white py-3 px-16 text-sm'>PLACE ORDER</button>

          </div>
        </div>
      </div>

    </div>
  ) 
}

export default PlaceOrder