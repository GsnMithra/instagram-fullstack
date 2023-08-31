const mongoose = require ('mongoose')

const instagramUser = new mongoose.Schema ({
    emailphone: {
        type: String,
        required: true
    },
    
    fullname: {
        type: String,
        required: true
    },
    
    username: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    dateofbirth: {
        type: {
            month: Number,
            date: Number,
            year: Number
        },
        required: true
    }
});

module.exports = mongoose.model ('InstagramUser', instagramUser, 'instagram-clone-users')