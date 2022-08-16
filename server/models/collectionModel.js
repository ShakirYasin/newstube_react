const mongoose = require('mongoose');


const collectionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    thumbnail: {
        type: String,
        required: [true, 'Please add an image']
    },
    posts: {
        type: [postIdSchema],
        required: [true, 'Please add at least one post']
    }
},
    {
        timestamps: true
    }
)

const postIdSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    }
})


module.exports = mongoose.model('Collection', collectionSchema)