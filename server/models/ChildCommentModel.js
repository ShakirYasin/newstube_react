const mongoose = require('mongoose');

const childCommentSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comment: {
        type: String,
        required: [true, 'Please add a Comment']
    },
},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('ChildComment', childCommentSchema)
