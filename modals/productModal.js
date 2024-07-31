import mongoose, { Schema } from "mongoose";
const dimensionsSchema = new Schema({
    height: { type: String },
    width: { type: String },
    depth: { type: String }
}, { _id: false });

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    offerInPercentage: {
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
    },
    weight: {
        type: String
    },
    dimensions: [dimensionsSchema],
    warrantyInfo: {
        type: String
    },
    returnPolicy: {
        type: String
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