import express from 'express'
import upload from '../middleware/uploadProductImages.js'
import { addProduct, deleteProduct, updateproduct } from '../controller/productController.js'

const productRouter = express.Router()

productRouter.post('/addproduct', upload.array('images', 10), addProduct)
productRouter.put('/updateproduct', upload.array('images', 10), updateproduct)
productRouter.delete('/deleteproduct', deleteProduct)

export default productRouter