import express from 'express'
import upload from '../middleware/uploadProductImages.js'
import { addProduct } from '../controller/productController.js'

const productRouter = express.Router()

productRouter.post('/addproduct', upload.array('images', 10), addProduct)

export default productRouter