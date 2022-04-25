const mongoose = require("mongoose");


const RepliesSchema = new mongoose.Schema({

    content: {
        type: String
    },

    likes: {
        type: Number,
        default: 0
    },

    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Idea"
    }



}, { timestamps: true })




const Replies = mongoose.model("Replies", RepliesSchema);





module.exports = Replies;