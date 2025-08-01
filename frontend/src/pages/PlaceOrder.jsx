import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setmethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

  const [formData, setFormdata] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '',
    zipcode: '', country: '', phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata(data => ({ ...data, [name]: value })) // ✅ FIXED: store value as string
  }
  const initPay = (order) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID, 
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response); // You can send this to your backend to verify payment
        try {
          const {data} =await axios.post(backendUrl,+'/api/order/verifyRazorpay',response,{headers:{token}});
          if (data.success){
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
           console.log(error)
           toast.error(error)
          
        }
      },
      
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id == items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            console.log(responseStripe.data.message)
            toast.error(responseStripe.data.message)
          }
          break;
        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
           if(responseRazorpay.data.success){
            initPay(responseRazorpay.data.order)
           }
          
          break;

        default:
          toast.error("Please select a valid payment method.")
          break;
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex-flex-col gap-4 mx-2 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-500 bg-blue-100 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-500 bg-blue-100 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
        </div>

        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-500 bg-blue-100 rounded my-2 py-1.5 px-3.5 w-full' type='email' placeholder='email@gmail.com' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-500 bg-blue-100 rounded my-2 py-1 px-3.5 w-full' type='text' placeholder='Street' />

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-500 bg-blue-100 my-2 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-500 bg-blue-100 my-2 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-500 bg-blue-100 my-2 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-500 bg-blue-100 my-2 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
        </div>

        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-500 bg-blue-100 my-2 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone' />
      </div>

      {/* Right Side */}
      <div className='mt-8 sm:mx-20 w-full sm:max-w-[500px] lg:max-w-[600px]'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            {[
              { id: 'stripe', img: assets.stripe_logo },
              { id: 'razorpay', img: assets.razorpay_logo },
              { id: 'upi', img: assets.upi_logo },
              { id: 'cod', label: 'CASH ON DELIVERY' }
            ].map(opt => (
              <div key={opt.id} onClick={() => setmethod(opt.id)} className='flex items-center gap-3 border border-blue-800 p-2 px-3 cursor-pointer'>
                <p className={`min-w-3 h-3.5 border border-blue-500 rounded-full ${method === opt.id ? 'bg-blue-700' : ''}`}></p>
                {opt.img ? <img className='h-5 mx-4' src={opt.img} alt='' /> : <p className='text-blue-800 text-sm font-medium mx-4'>{opt.label}</p>}
              </div>
            ))}
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-blue-800 text-white py-3 px-16 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
