const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    profilePicture: {
        type: String,
        required: false
    },
    coverPhoto: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false,
        default: 'USER'
    },
    isACreator: {
        type: Boolean,
        required: false,
        default: false,
    },
},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('User', userSchema)




// {
//     id: "1",
//     name: "John Doe",
//     image: user1,
//     designation: "Senior Journalist",
//     followers: '980',
//     posts: '34',
//     rating: '4.5'
// },