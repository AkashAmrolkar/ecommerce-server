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
    discountPercentage: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: [
        {
            type: String
        }
    ],
    stock: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
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