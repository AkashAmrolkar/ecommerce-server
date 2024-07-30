import Product from "../modals/productModal.js"

export const appProduct = async(req,res) =>{
    try {
        const {name, description, price, offerinpercentage, category, tags, stock, brand, sku, images} = req.body

        
        const newProduct = new Product({
            name, description, price, offerinpercentage, category, tags, stock, brand, sku, images
        })
        await newProduct.save()
        res.status(200).json({message: 'New product created successfully'})
    } catch (error) {
        console.log(error)
    }
}