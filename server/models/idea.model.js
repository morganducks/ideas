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

    ideaLikes: {
        type: Number,
    },

    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Replies"
        }
    ]

}, { timestamps: true });



const Idea = mongoose.model('Idea', IdeaSchema);

module.exports = Idea;

