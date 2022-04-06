const mongoose = require('mongoose');
const IdeaSchema = new mongoose.Schema({
    ideaName: {
        type: String,
        minlength: [3, "Author name must be at least 3 characters long"],
        required: [true, "Must enter name"],
    },
    ideaType: {
    type: String,
    required: [true, "Must choose a type"],
    enum:[
        "Dog",
        "Cat",
]
    },
    ideaGender: String,
    ideaAge: Number,
    ideaImage: String,
    ideaDesc: {
        type: String,
        minlength: [3, "Description must be at least 3 characters long"],
        required: [true, "Must be longer than 3 characters"]
    },
    ideaLike: Number,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });



module.exports = mongoose.model('Idea', IdeaSchema);

