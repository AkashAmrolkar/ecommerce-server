import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToDB } from './db/connect.js'
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


app.get('/', (req, res)=>{
    res.send('root')
})

app.listen(port, ()=>{
    try {
        connectToDB(mongoUrl);
        console.log(`Server listening on port ${port}`)

    } catch (error) {
        console.log(error)
    }
})

