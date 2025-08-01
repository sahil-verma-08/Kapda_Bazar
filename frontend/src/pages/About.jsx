import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/frontend_assets/assets'
import {Newsletterbox} from '../component/Newsletterbox'


const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'Us'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=''/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Welcome to <span className='font-bold'>Kapda Bajaar</span>, your ultimate online shopping destination for all things fashion. We are an e-commerce platform focused on offering a diverse collection of clothing that caters to every style, occasion, and age group. From elegant traditional wear to modern casuals and the latest fashion trends, we have something for everyone. Our aim is to bring high-quality, stylish, and comfortable clothing to your doorstep at the most affordable prices. We carefully curate each product to ensure that our customers receive nothing but the best in terms of fabric, design, and durability.</p>
        <p>At Kapda Bajaar, we are committed to delivering a seamless and enjoyable shopping experience. Our website is designed to be user-friendly, making it easy to browse, select, and purchase your favorite outfits. We offer multiple secure payment options, fast and reliable delivery services, and dedicated customer support to assist you at every step. Whether you're shopping for a festival, a family function, or daily wear, Kapda Bajar is here to fulfill all your fashion needs with trust and satisfaction. Join our growing family of happy customers and redefine your style with us!</p>
       <b className='text-gray-800'>Our Mission</b>
       <p>At Kapda Bajar, our mission is to make fashion <span className='font-bold'> accessible, affordable, and enjoyable </span> for everyone. We believe that clothing is not just a necessity but an expression of individuality and culture. That’s why we are dedicated to providing a wide range of stylish, high-quality apparel that fits every personality and occasion. Our goal is to bridge the gap between premium fashion and everyday affordability, ensuring that no one has to compromise on style due to price. We continuously strive to enhance our collection, improve customer experience, and build a platform where shopping for clothes is as delightful as wearing them.</p>
        </div>

      </div>

      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US '}/>

      </div>
      <div className='flex flex-col  md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>  we ensure that every product meets high standards of fabric, stitching, and durability. Our team carefully checks each item before it reaches you, so you always get the best in both quality and comfort. We are committed to delivering products you can trust and wear with confidence.</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>  we make shopping easy and hassle-free. With a user-friendly website, secure payment options, and fast delivery services, you can shop your favorite styles from the comfort of your home. Our goal is to provide a smooth and convenient experience from browsing to checkout.</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b> Exceptional Customer Service:</b>
          <p className='text-gray-600'>customer satisfaction is our priority. Our support team is always ready to help with your queries, orders, or any concerns to ensure a smooth shopping experience.</p>

        </div>
      </div>
      <Newsletterbox/>
      </div>
  )
}

export default About