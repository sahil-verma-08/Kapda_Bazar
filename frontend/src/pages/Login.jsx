import React, { useState } from 'react'

const Login = () => {
  const [currentState,setCurrentState]=useState('Sign UP');
  const onSubmitHandle=async(e)=>{
    e.preventDefault();
  }
  return (
    <form onSubmit={onSubmitHandle} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>
          {currentState}
        </p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>

      </div>
     {currentState=='Login'? '': <input type='text' className='w-full px-5 py-2 border border-blue-900 bg-blue-100' placeholder='Name' required/>}
      <input type='email' className='w-full px-5 py-2 border border-blue-900 bg-blue-100' placeholder='Email' required/>
      <input type='Password' className='w-full px-5 py-2 border border-blue-900 bg-blue-100' placeholder='Password' required/>
       <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forget your Password?</p>
        {
          currentState=='Login'?
          <p  onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer text-blue-600 font-bold'>Create account</p>:
          <p onClick={()=>setCurrentState('Login')}  className='cursor-pointer text-blue-600 font-bold'>Login Here</p>
        }
       </div>
          <button className='bg-blue-800 text-white font-light px-8 py-3 mt-4' >{currentState ==='Login'?'Sign IN' : 'Sign Up'} </button>
    </form>
  )
}

export default Login