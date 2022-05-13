const jwt = require("jsonwebtoken");
const Idea = require('../models/idea.model');
const User = require('../models/user.model')
const Likes = require('../models/likes.model')

module.exports = {

viewIdeas: (req, res) => {
    Idea.find()
    .populate("replies", "content _id likes")
    .populate("createdBy", "userName")
        .then((viewIdeas) => {
            res.json(viewIdeas)
            console.log("All great ideas!")
        })
        .catch((err) => {
            res.json(err)
            console.log("Something went wrong getting all ideas")
        });
},

createIdea: (req, res) => {

    const newIdeaObject = new Idea(req.body)

    const decodeJWT = jwt.decode(req.cookies.userToken, {
        complete: true
    })

    newIdeaObject.createdBy = decodeJWT.payload.id;

    newIdeaObject.save()
        .then((createIdea) => {
            res.json(createIdea);
            console.log("You created a post!")
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
            console.log('Something went wrong during creating the post');
        })
},

findIdeasByUser: (req, res) => {
    //confirm user is logged in
    if(req.jwtPayload.userName !==  req.params.userName){
        console.log("invalid user")
        
        User.findOne({userName: req.params.userName})
        .then((userNotLoggedIn)=> {
            Idea.find({createdBy: userNotLoggedIn._id})
                .populate("createdBy", "userName")
                // .populate("ideas", "ideaLikes")
                .populate("replies", "content _id likes")
                .then((ideasFromUser) => {
                    console.log(ideasFromUser)
                    res.json(ideasFromUser)
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
            console.log("test")
        })
    }  else {
        console.log("user")
        console.log("req.jwtPayload.id:", req.jwtPayload.id)
        
        Idea.find({createdBy: req.jwtPayload.id})
            .populate("createdBy", "userName userEmail")
            // .populate("replies", "content _id likes")
            .then((ideasFromLoggedUser) => {
                console.log(ideasFromLoggedUser)
                res.json(ideasFromLoggedUser)
                console.log("all ideas?")
            })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })
    }
},


deleteIdea: (req, res) => {
    Idea.deleteOne({ _id: req.params.id })
    .then((deletedIdea) => {
        res.json(deletedIdea)
        console.log("Successfully deleted post")
    })
        .catch((err) => {
            res.json(err)
            console.log("Did not Delete post")
        })
    },

    updateIdea: (req, res) => {
        Idea.findOneAndUpdate({ _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
            )
            .then((updateIdea) => {
                res.json(updateIdea);
                console.log(updateIdea);
                console.log("Successfully updated post")
            })
            .catch((err) => {
                console.log('Something went wrong during updateIdea');
                console.log(err);
                res.status(400).json(err);
            })
        },

        oneIdea: (req, res) => {   
        Idea.findOne({ _id: req.params.id })
        .populate("createdBy", "userName userEmail")
        .populate("ideaLikes", "ideaId ideaName")
            .then((viewIdeas) => {
                res.json(viewIdeas)
                console.log("All great ideas!")
            })
            .catch((err) => {
                res.json(err)
                console.log("Something went wrong getting all ideas")
            });
    },

}