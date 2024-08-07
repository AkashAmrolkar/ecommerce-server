import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToDB } from './db/connect.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/auth.js'
import productRouter from './routes/productRoutes.js'
dotenv.config()
const app = express()

//Middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

//env variable
const port = process.env.PORT || 5000
const mongoUrl = process.env.MONGODB_URL

app.listen(port, ()=>{
    try {
        connectToDB(mongoUrl);
        console.log(`Server listening on port ${port}`)

    } catch (error) {
        console.log(error)
    }
})

app.use('/api/v1', userRoutes)
app.use('api/v1', authRoutes)
app.use('/api/v1', productRouter)