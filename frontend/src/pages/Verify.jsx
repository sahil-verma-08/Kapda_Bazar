import React, { useContext, useEffect,  } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from "axios"
import {toast} from 'react-toastify'

const Verify = () => {
    const {navigate,token,setCartItems,backendUrl}=useContext(ShopContext)
    const [SearchParams,setSearchParams]=useSearchParams()
    const success =SearchParams.get('success')
    const orderId =SearchParams.get('orderId')
const verifyStripe= async()=>{
    try {
        if(!token){
            return null
        }
        const response = await  axios.post(backendUrl+'/api/order/verifyStripe',{success,orderId},{headers:{token}})
        if (response.data.success){
            setCartItems({})
            navigate('/orders')
        }else{
            navigate('/cart')
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }

}
useEffect(()=>{
    verifyStripe()

},[token])
  return (
    <div>

    </div>
  )
}

export default Verify