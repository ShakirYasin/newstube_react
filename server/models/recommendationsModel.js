const mongoose = require('mongoose');

const recommendationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tags: [{
        type: String,
        required: false
    }],
    categories: [{
        type: String,
        required: false
    }],

},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Recommendation', recommendationSchema)