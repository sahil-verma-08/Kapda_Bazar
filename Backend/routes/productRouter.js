import express from 'express';
import {listProduct,addProduct,removeProduct,singleProduct} from '../controllers/ProductController.js';
import uplode from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
const productRouter =express.Router()

productRouter.post('/add', adminAuth ,  uplode.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
productRouter.post('/remove',adminAuth, removeProduct)
productRouter.post('/single', singleProduct)

productRouter.get('/list',listProduct)


export default productRouter;