import mongoose from "mongoose";

export const connectToDB= async(mongoUrl)=>{
    try {
        const conn = await mongoose.connect(mongoUrl)   
        if (conn) {
            console.log('Connected to MongoDB');
        } else {
            console.error('Failed to connect to MongoDB');
        } 
    } catch (error) {
        console.log(error)
    }
}