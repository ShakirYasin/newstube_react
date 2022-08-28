const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    watchHistory: [{ 
        date: {
            type: Date,
            required: true
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Post'
        }
    }]
},
    {
        timestamps: true
    }
)




module.exports = mongoose.model('History', historySchema)
