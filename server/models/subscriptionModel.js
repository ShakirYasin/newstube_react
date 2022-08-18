const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
    userTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please insert id of the channel subscribed"],
        ref: 'User'
    },
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please insert subscriber id"],
        ref: 'User'
    },
},
    {
        timestamps: true
    }
)



module.exports = mongoose.model('Subscription', subscriptionSchema)