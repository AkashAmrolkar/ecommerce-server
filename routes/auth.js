import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import express from 'express'
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js'
import User from '../modals/userSchema.js'
 dotenv.config()

 const router = express.Router()

 router.post('/refresh-token', async(req, res)=>{
    const {refreshToken} = req.body
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token required' });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        user.refreshToken = newRefreshToken;
        await user.save();

        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (err) {
        res.status(403).json({ error: 'Invalid refresh token' });
    }

 })

 export default router