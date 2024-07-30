import cloudinary from "../config/cloudinaryConfig.js";
import Product from "../modals/productModal.js"

export const addProduct = async(req,res) =>{
    try {
        const {name, description, price, offerinpercentage, category, tags, stock, brand, sku} = req.body
        console.log(req.body)
        const files = req.files;
        console.log(files)
        const uploadResult = []
        
        for(const file of files){
            const result= await cloudinary.uploader.upload(file.path, {
                folder: 'ecommerce'
            })
            console.log(result);
            const imgPath = result.secure_url
            uploadResult.push(imgPath)
        }
        const newProduct = new Product({
            name, description, price, offerinpercentage, category, tags, stock, brand, sku
        })
        //await newProduct.save()
        res.status(200).json({message: 'New product created successfully'})
    } catch (error) {
        console.log(error)
    }
}