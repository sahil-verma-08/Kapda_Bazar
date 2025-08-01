import express from "express"
import adminAuth from "../middleware/adminAuth.js";
import authUser from '../middleware/auth.js'
import {PlaceOrder,PlaceOrderRazorpay,PlaceOrderStrip,allOrder,userOrder,updateStatus, verifyStripe, verifyRazorpay} from  '../controllers/orderController.js'
const oderRouter=express.Router();
                                 //Admin Features

oderRouter.post('/list',adminAuth ,allOrder);
oderRouter.post('/status',adminAuth ,updateStatus);

                              // payment features

oderRouter.post('/place',authUser,PlaceOrder)
oderRouter.post('/stripe',authUser,PlaceOrderStrip)
oderRouter.post('/razorpay',adminAuth ,PlaceOrderRazorpay);

// user Features
oderRouter.post('/verifyStripe',authUser,verifyStripe)
oderRouter.post('/verifyRazorPay',authUser,verifyRazorpay)

oderRouter.post('/userorders',authUser,userOrder)
export   default oderRouter;
 


