import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authentication = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]
    
    if(!token){
        return res.status(401).json({error: 'Access Denied. No token provided'})
    }
    try {
        const decoded = jwt.verify(token, process.JWT_REFRESH_ACCESS_KEY)
        req.user = decoded;
        next()
    } catch (error) {
        res.status(400).json({error: 'Invalid Token'})
    }
}

export default authentication