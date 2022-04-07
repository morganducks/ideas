const mongoose = require('mongoose');
const IdeaSchema = new mongoose.Schema({
    idea: {
        type: String,
        minlength: [3, "Post must be at least 3 characters long"],
        required: [true, "Must enter name"],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });



module.exports = mongoose.model('Idea', IdeaSchema);

