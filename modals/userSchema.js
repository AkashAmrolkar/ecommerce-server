import mongoose from "mongoose";
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
            required: [true, 'Address is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        state: {
            type: String,
            required: [true, 'state is required']
        },
        postalcode: {
            type: String,
            required: [true, 'Postal code is required'],
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
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format validation for international phone numbers.
            },
            message: props => `${props.value} is not a valid phone number`
        }
    },
    orders:{
        type: schema.Types.ObjectId,
        ref: 'Order'
    },
},{ timestamps: true })

const User = mongoose.model('User', userSchema)
export default User