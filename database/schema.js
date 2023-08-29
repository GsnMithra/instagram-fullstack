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
    }
});

module.exports = mongoose.model ('InstagramUser', instagramUser, 'instagram-clone-users')