const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    }
})
userSchema.pre('save',async function (next){
    const user = this
    if(user.isModified('firstname')) {
        user.firstName = await bcrypt.hash(user.firstname,8)
    }
    if(user.isModified('lastname')) {
        user.lastname = await bcrypt.hash(user.latname,8)
    }
    if(user.isModified('college')) {
        user.college = await bcrypt.hash(user.college,8)
    }
    next()
})

userSchema.statics.findByEmail = async (email) => {
    const user = await User.findOne({ email})
    if (!user) {
        throw new Error({ error: 'User not found' })
    }
    return user
}

const User = mongoose.model('User', userSchema)