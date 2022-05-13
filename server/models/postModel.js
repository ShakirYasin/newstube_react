const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    }
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