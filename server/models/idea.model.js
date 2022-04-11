const mongoose = require('mongoose');
const IdeaSchema = new mongoose.Schema({
    ideaName: {
        type: String,
        // minlength: [3, "Post must be at least 3 characters long"],
        // required: [true, "Must enter name"],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    postLike: {
        type: Number,
        // jimbo like want to like add his user to array array.length (+1 the output) will show accumulated like 
    },

    countLikes: [{type: String}],


}, { timestamps: true });



module.exports = mongoose.model('Idea', IdeaSchema);

