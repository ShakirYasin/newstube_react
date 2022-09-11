const mongoose = require('mongoose');

const wishListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    wishlist: [
        {
            post: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Post'
            }
        }
    ]
},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Wishlist', wishListSchema)