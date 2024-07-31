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
            name, description, price, offerinpercentage, category, tags, stock, brand, sku, images:uploadResult
        })
        await newProduct.save()
        res.status(200).json({message: 'New product created successfully'})
    } catch (error) {
        console.log(error)
    }
}

export const updateproduct = async (req, res) => {
    try {
        const {id,name, description, price, offerInPercentage, category, tags, stock, brand, sku, returnPolicy, warrantyInfo, depth, width, height, weight, thumbnail} = req.body
        
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({message: 'Product not found'})
        }
        product.name = name;
        product.description = description;
        product.price = price;
        product.offerInPercentage = offerInPercentage;
        product.category = category;
        product.tags = tags;
        product.stock = stock;
        product.brand = brand;
        product.sku = sku;
        product.returnPolicy = returnPolicy;
        product.warrantyInfo = warrantyInfo;
        product.dimensions.depth = depth;
        product.dimensions.width = width;
        product.dimensions.height = height;
        product.weight = weight;
        product.thumbnail = thumbnail;
        await product.save();

        return res.status(200).json({ message: "Product updated successfully", product });

    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (req, res) =>{
    try {
        const {id} = req.body
        console.log(id)
        const product = await Product.findOneAndDelete({_id: id})
        if(!product){
            return res.status(400).json({message: 'Product not found..!'})
        }
        return res.status(202).json({message: "Product deleted successfully..!"})
    } catch (error) {
        console.log(error)
    }
}