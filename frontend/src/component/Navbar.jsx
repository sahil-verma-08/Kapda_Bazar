import React, { useContext, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
const Navbar = () => {
  const [visible,setvisible]=useState(false);
  const {setShowSearch,showSearch,getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext)
  const logout=()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }
  return (
    <div className='flex items-center justify-between h-20 bg-blue-300 py-5 px-4 sm:px-10 front-medium'>

    <Link to='/'>  <img src={assets.logo} className='w-36 ' alt=''></img></Link>

      <ul className=' hidden sm:flex gap-8 text-sm text-gray-700 '>

        <NavLink to="/" className="flex flex-col iteam-center gap-1">
          <p className='text-slate-950'>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 t hidden ' />

        </NavLink>
        <NavLink to="/collection" className="flex flex-col iteam-center gap-1">
          <p className='text-slate-950'>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />

        </NavLink>
        <NavLink to="/about" className="flex flex-col iteam-center gap-1">
          <p className='text-slate-950'>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

        </NavLink>
        <NavLink to="/contact" className="flex flex-col iteam-center gap-1">
          <p className='text-slate-950'>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />

        </NavLink>
      </ul>

      <div className='flex items-center gap-8'>
      <Link to='/collection' onClick={()=>setShowSearch(true)}> <img onClick={()=>setShowSearch(!showSearch)} src={assets.search_icon} className='w-5 cursor-pointer ' alt="" /></Link>
        <div className='group relative'>
          <div className='flex gap-2'>
           
           <img onClick={()=>token?null:navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer ' alt="" />
            {/* drop down  */}
          <p className='font-bold'>User</p>

          </div>
          { token &&
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-3 bg-blue-100 text-gray-700 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={()=>navigate("/orders")} className='cursor-pointer hover:text-black'>Orders </p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>

            </div>

          </div>
}

        </div>
  
        <Link to="/cart" className='relative'>
        <img src={assets.cart_icon} className='w-5 min-w-5' alt=''/>
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        
        </Link>


        <img onClick={()=>setvisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt=''/>

      </div>
              {/* side bar menu for small screns */}
              <div className={`absolute top-0  right-0 bottom-0 overflow-hidden bg-blue-100 transition-all ${visible?'w-full': "w-0"}`}>
                <div className='flex flex-col text-gray-600'>
                  < div onClick={()=>setvisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                  <img className='h-4 rotate-180' src={assets.dropdown_icon} alt=''/>
                  <p>Back</p>
                  </div>

                  <NavLink  onClick={()=>setvisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
                  <NavLink onClick={()=>setvisible(false)} className='py-2 pl-6 border'  to='/collection'>Collection</NavLink>
                  <NavLink  onClick={()=>setvisible(false)} className='py-2 pl-6 border' to='/about'>about</NavLink>
                  <NavLink  onClick={()=>setvisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
                </div>

              </div>
    </div>
  )
}

export default Navbar