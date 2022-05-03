const mongoose = require('mongoose');
const LikesSchema = new mongoose.Schema({
ideaId: {
    type: String,
},

ideaName: {
    type: String,
}


}, { timestamps: true });



const Likes = mongoose.model('Likes', LikesSchema);

module.exports = Likes;

