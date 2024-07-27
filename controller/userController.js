import User from "../modals/userSchema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js"

export const registerUser = async (req, res) =>{
    try {
        const {name, email, password} = req.body
        console.log(name, email, password)
        const checkUserExist = await User.findOne({email})

        bcrypt.hash(password, 10, )

        if(checkUserExist){
            return res.status(400).json({message: 'Email alrady exist'})
        }        

        const user = new User({
            name, email, password
        });
        await user.save();
        res.status(201).json(user);
        
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: 'User does not exist'})
        }
        const comparePass = await user.comparePassword(password)
        if(!comparePass){
            return res.status(400).json({message: 'Wrong password'})
        }
        const payload = {
            userId: user._id,
            email: user.email
        }
        const accessToken = generateAccessToken(payload)
        console.log("Accesstoken: ",accessToken)
        const refreshToken = generateRefreshToken(payload)
        console.log("Refreshtoken: ",refreshToken)
        user.refreshToken = refreshToken;
        await user.save();
        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.log(error)
    }

}