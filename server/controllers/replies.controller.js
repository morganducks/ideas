const Reply = require('../models/replies.model');
const Idea = require('../models/idea.model');
const User = require('../models/user.model')



module.exports = {



    findAllReplies: (req, res) => {
        Reply.find()
            .then((allReplies) => {
                console.log(allReplies);
                res.json(allReplies);
            })
            .catch((err) => {
                console.log("Find All Replies failed");
                res.json({ reply: "Something went wrong in findAll", error: err })
            })
    },



    createNewReply:  (req, res)=>{

        Reply.create(req.body)
            .then((replyPosted)=>{
                console.log(replyPosted);
                
                Reply.findOneAndUpdate({_id: req.params.id},
                    {
                        $addToSet: {replies: replyPosted._id}
                    },
                    {
                        new: true,
                        useFindAndModify: true
                    })
                    .populate("replies", "content _id")
                    .then((replyToUpdate)=>{
                        console.log(replyToUpdate);
                        res.json(replyPosted)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            })
            .catch((err)=>{
                console.log(err)
            })
    },

    likeReply: (req, res) => {
        Reply.findOneAndUpdate({ _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .populate("reply", "")
            .then((likeAdded) => {
                res.json(likeAdded)
            })
            .catch((err) => {
                res.status(400).json(err); 
            })
    }



}