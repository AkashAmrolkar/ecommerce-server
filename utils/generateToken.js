import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateAccessToken = (payload) =>{
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '15m'})
}

export const generateRefreshToken = (payload) =>{
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '1d'})
}