const mongoose = require('mongoose');
const WalkSchema = new mongoose.Schema({
    walkName: {
        type: String,
        minlength: [3, "Author name must be at least 3 characters long"],
        required: [true, "Must enter name"],
    },
    walkType: {
    type: String,
    required: [true, "Must choose a type"],
    enum:[
        "Dog",
        "Cat",
]
    },
    walkGender: String,
    walkAge: Number,
    walkImage: String,
    walkDesc: {
        type: String,
        minlength: [3, "Description must be at least 3 characters long"],
        required: [true, "Must be longer than 3 characters"]
    },
    walkSkillOne: String,
    walkSkillTwo: String,
    walkSkillThree: String,
    walkLike: Number,

}, { timestamps: true });

module.exports = mongoose.model('Walk', WalkSchema);

