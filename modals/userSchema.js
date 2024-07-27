import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const {Schema} = mongoose
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function(v){
                return /.+@.+\..+/.test(v);
            },
            message: props=> `${props.value} is not valid Email`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 Characters']
    },
    phone: {
        type: String,

    },
    address: {
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        postalcode: {
            type: String,
            validate: {
                validator: function(v) {
                    return /^\d{6}$/.test(v); // Basic US postal code regex. Adjust if needed.
                },
                message: props => `${props.value} is not a valid postal code`
            }
        }
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format validation for international phone numbers.
            },
            message: props => `${props.value} is not a valid phone number`
        }
    },
    orders:{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    refreshToken:{
        type: String,
    }
},{ timestamps: true })

//Middleware for generate hash password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        next(error)
    }
} )

// function to compare password
userSchema.methods.comparePassword = async function(candidatePassword){
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
}

const User = mongoose.model('User', userSchema)
export default User