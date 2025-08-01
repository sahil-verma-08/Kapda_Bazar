import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './components/Login';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'


export const backendUrl =  import.meta.env.VITE_BACKEND_URL;

export const currency="₹"
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'): '');

  useEffect(()=>{
        
    localStorage.setItem('token',token)
  },[token])
  

  return (
    <div className='bg-blue-100 min-h-screen'>
      <ToastContainer/>
      {token === '' ?
        <Login setToken={setToken} /> :
        <>
          <Navbar  setToken={setToken} />
          <hr />
          <div className='flex w-full'>

            <Sidebar />
            <div className='w-[80%] mx-auto ml-[max(4vw,25px)] my-8 text-gray-600 text-base'>

              <Routes>
              
                <Route path='/' element={<Home token={token}/>}/>
                <Route path='/add' element={<Add  token={token} />} />
                <Route path='/list' element={<List  token={token} />} />
                <Route path='/orders' element={<Order  token={token} />} />




              </Routes>



            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App