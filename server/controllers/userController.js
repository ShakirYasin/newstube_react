const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


// @desc GET Users 
// @route GET /api/users
// @access Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    if (users) {
        res.json(users).status(200)
    }
    else {
        res.status(404)
        throw new Error('Users Not Found')
    }
})

// @desc GET Users 
// @route GET /api/users
// @access Public
const deleteUsers = asyncHandler(async (req, res) => {
    const users = await User.deleteMany()

    if (users) {
        res.json(users).status(200)
    }
    else {
        res.status(400)
        throw new Error('Bad Request')
    }
})




// @desc REGISTER Users 
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role, isACreator } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(409)
        throw new Error('User already exists')
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isACreator
    })

    if (user) {
        res.status(201).send('Registration Successful')
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Authenticate a User 
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check user email
    const user = await User.findOne({ email })

    if (!user) {
        res.status(404)
        throw new Error('User not Found')
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isACreator: user.isACreator,
            token: generateToken(user._id, user.name)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get user data 
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    // const user = await req.user
    // console.log(user)
    res.status(200).json(user)
})


// @desc    Get user data 
// @route   GET /api/users/me
// @access  Private
const updateMe = asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, {new: true})
    
        if(!user){
            res.status(404)
            throw new Error(`No user with the id of ${req.body.id}`)
        }
        
        res.status(200).json(user)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})


// Generate JWT
const generateToken = (id, name) => {
    return jwt.sign({ id, name }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    getUsers,
    registerUser,
    loginUser,
    getMe,
    updateMe,
    deleteUsers
}