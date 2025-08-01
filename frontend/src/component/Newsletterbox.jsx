import React from 'react'

export const Newsletterbox = () => {
    const onSubmitHandler=(event)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'> Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
        Join our mailing list to receive exclusive offers, latest fashion updates, and special discounts. Don’t miss out — stay connected with Kapda Bajar and upgrade your wardrobe at the best prices!
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 '>
            <input className='w-full sm:flex-1 py-2 px-1 outline-none' type='email' placeholder='Enter your email' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-3'>SUBSCRIBE</button>
        </form>
    </div>
  )
}
