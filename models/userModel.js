import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: Number
    },
    following: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    followers: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    isPrivate: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
export default User