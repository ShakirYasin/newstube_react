const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
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
    image: {
        type: String,
        required: [true, 'Please add an image']
    },
    audio: {
        type: String,
        required: [false, 'Please add an audio']
    },
    video: {
        type: String,
        required: [false, 'Please add a video']
    },
    tags: [{
        type: String,
    }],
    categories: [{
        type: String,
    }]
},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Post', postSchema)



// {
//     id: "1",
//     thumbnail: lamp,
//     channelThumbnail: user1,
//     authorName: "Alexander Parkinson",
//     title: "Green plants are going to Extinct about 500 times faster than they should, Study finds",
//     description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod porro autem itaque voluptatibus voluptatem voluptates magni eligendi illo exercitationem minima, sint deleniti sunt fugit iste doloremque inventore tempore voluptate repudiandae. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod porro autem itaque voluptatibus voluptatem voluptates magni eligendi illo exercitationem minima, sint deleniti sunt fugit iste doloremque inventore tempore voluptate repudiandae.",
//     date: "Jun 20, 2019",
//     views: '2,805'
// },