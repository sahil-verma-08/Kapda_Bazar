import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/frontend_assets/assets'
import { Newsletterbox } from '../component/Newsletterbox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={"CONTACT"} text2={'US'}/>

      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt=''/>
        <div className='flex flex-col justify-center items-start gap-6' >
          <p className='text-xl text-gray-600 font-semibold'>Our store</p>
          <p className='text-gray-500'>462 valencia,Ghaziabad<br/>UP India</p>
          <p className='text-gray-500'>Tel:(562)578-0983 <br /> Email:kapdaBazaar@gmail.com</p>
          <p className='text-gray-600 font-semibold text-xl'> Careers at kapda Bazaar</p>
          <p className='text-gray-500'> Learn more about our team and job opening. </p>
           <button className='border border-black px-8 py-4 text-sm hover:bg-blue-600 hover:text-white transition-all duration-500'>Explore jobs</button>
        </div>
      </div>
      <Newsletterbox/>
    </div>
  )
}

export default Contact