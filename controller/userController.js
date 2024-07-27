import User from "../modals/userSchema.js"
import bcrypt from 'bcrypt'

export const addUser = async (req, res) =>{
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