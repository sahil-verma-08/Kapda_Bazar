import React from 'react'
import {assets} from '../assets/admin_assets/assets'
import { Link} from 'react-router-dom'
const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center bg-blue-300  py-2 px-[4%] justify-between'>
        <Link to='/'>  <img src={assets.logo} className='w-36 ' alt=''></img></Link>

        <button onClick={()=>setToken('')} className='bg-blue-700 text-white px-5 py-2 sm:py-2 sm:px-7 rounded-full text-xs sm:text-sm'> Logout</button>
    </div>
  )
}

export default Navbar;