import mongoose, { Schema } from "mongoose";
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    offerinpercentage: {
        type: Number,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    tags: [
        {
            type: String
        }
    ],
    stock: {
        type: Number,
    },
    brand: {
        type: String,
    },
    sku: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    images: 
    [
        {
        type: String,
        required: true
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
},{ timestamps: true })

const Product = mongoose.model('Product', productSchema)
export default Product