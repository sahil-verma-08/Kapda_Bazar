import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe"
import razorpay from "razorpay"


//global variable
const currency='inr'
const deliveryCharge=100

//gateway intizlize
const stripe =new Stripe(process.env.STRIP_SECRET_KEY)

const razorpayInstance =new razorpay({
    key_id:process.env.RAZARPAY_KEY_ID,
    key_secret:process.env.RAZARPAY_KEY_SECRET,
})
// plceing order using cod

const PlaceOrder=async(req,res)=>{
    try {
        
        const {userId,items,amount,address}=req.body;
        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()

              }
              const newOrder= orderModel(orderData);
              await newOrder.save()

              await userModel.findByIdAndUpdate(userId, { cartData: {} });
              res.json({success:true,message:"Order PLace"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }

}
                    // plceing order using Strip
const PlaceOrderStrip=async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body;
        const {origin}=req.headers;
        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()

              }
              const newOrder= orderModel(orderData);
              await newOrder.save()

              const line_items=items.map((item)=>({
                price_data:{
                    currency:currency,
                    product_data:{
                        name: item.name
                    },
                    unit_amount: item.price*100
                },
                quantity:item.quantity
              }))
          line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharge*100
            },
            quantity:1

          })
          const session =await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })
        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}
//verify stripe
const verifyStripe= async(req,res)=>{
    const {orderId,success,userId}=req.body 
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true});
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:error.message})

        }
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}
//verify razorpay

const verifyRazorpay=async(rq,res)=>{
    
    try {
        const {userId,razorpay_order_id}=req.body;
        const orderInfo = await  razorpayInstance.orders.fetch(razorpay_order_id)
       if(orderInfo.status==="paid"){
        await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"payment Successful"});
    }
    else{
        
        res.json({success:false,message:"payment failed"})

    }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}
                    // plceing order using razorpay
const PlaceOrderRazorpay=async(req,res)=>{

    try {
        const {userId,items,amount,address}=req.body;
 
        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()

              }
              const newOrder= orderModel(orderData);
              await newOrder.save()
            const option={
                amount:amount*100,
                currency: currency.toUpperCase(),
                receipt:newOrder.id.toString()
            }
        
            await razorpayInstance.orders.create(option,(error,order)=>{
                if (error){
                    console.log(error)
                    return res.json({success:true,message:error})
                }
                res.json({success:true,order})
            })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

    
}

                    // All order Data for admin
const allOrder= async (req,res)=>{
         try {
            const orders=await orderModel.find({})
            res.json({success:true ,orders})
            
         } catch (error) {
            console.log(error)
        res.json({success:false,message:error.message})
         }
}
                //   All oder data for fronted 
const userOrder= async (req,res)=>{

    try {
        
        const {userId}=req.body;
        const orders =  await orderModel.find({userId})

        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
    
}

                 //update order status from admin

const updateStatus= async(req,res)=>{

    try {
        const {orderId,status} =req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true ,message:'Status updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


export {PlaceOrder,PlaceOrderRazorpay,PlaceOrderStrip,allOrder,userOrder,updateStatus,verifyStripe,verifyRazorpay}