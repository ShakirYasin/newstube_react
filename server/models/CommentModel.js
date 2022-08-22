const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
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
    children: [{
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChildComment'
        }
    }
]
},
    {
        timestamps: true
    }
)




module.exports = mongoose.model('Comment', commentSchema)
