import User from "../models/userModel"
import User from "../models/userModel"
const asyncHandler = require('express-async-handler')

export const registerUser = asyncHandler(async (req, res) => {
    try {
        const { username, email, password, phone } = req.body
        if (!username || !email || !password) {
            res.status(400).json({
                success: false,
                message: 'required fields are missing'
            })
        }
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            res.status(400).json({
                success: false,
                message: 'Email already exists'
            })
        }
        const existingUsername = await User.findOne({ username })
        if (existingUsername) {
            res.status(400).json({
                success: false,
                message: 'Username already exists'
            })
        }
        const user = new User({
            username,
            email,
            password
        })
        const newUser = await user.save()
        if (newUser) {
            res.status(201).json({
                success: true,
                message: 'New User Registered successfully'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error in Registering User'
        })
    }
})

export const Login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'required fields are missing'
            })
        }
        const user = await User.findOne({ email })
        if (password !== user.password) {
            res.status(400).json({
                success: false,
                message: 'Invalid password'
            })
        }

        if (password == user.password) {
            res.status(200).json({
                success: true,
                message: 'User login successfull'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error in Login'
        })
    }
})