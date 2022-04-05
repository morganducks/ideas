const mongoose = require('mongoose');
const WalkSchema = new mongoose.Schema({
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
    ideaSkillOne: String,
    ideaSkillTwo: String,
    ideaSkillThree: String,
    ideaLike: Number,

}, { timestamps: true });

module.exports = mongoose.model('Walk', WalkSchema);

