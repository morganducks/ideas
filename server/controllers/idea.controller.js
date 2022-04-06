const jwt = require("jsonwebtoken");
const Idea = require('../models/idea.model');

const createIdea = (req, res) => {

    const newIdeaObject = new Idea(req.body)

    const decodeJWT = jwt.decode(req.cookies.userToken, {
        complete: true
    })

    newIdeaObject.createdBy = decodeJWT.payload.id;

     Idea.create(req.body)
        .then((createIdea) => {
            res.json(createIdea);
            console.log("You created a pet!")
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
            console.log('Something went wrong during createIdea');
        })
}

const viewIdeas = (req, res) => {

    Idea.find({})
    .populate("createdBy", "userName userEmail" )
        .then((viewIdeas) => {
            res.json(viewIdeas)
            console.log("All great ideas!")
        })
        .catch((err) => {
            res.json(err)
            console.log("Something went wrong getting all ideas")
        });
}

const viewOneIdea = (req, res) => {
    Idea.findOne({ _id: req.params.id })
        .then(viewOneIdea => res.json(viewOneIdea))
        .catch(err => res.json(err));
}

const updateIdea = (req, res) => {
    console.log("editing...")
    Idea.findOneAndUpdate({ _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then((updateIdea) => {
            res.json(updateIdea);
            console.log(updateIdea);
            console.log("Successfully updated pet")
        })
        .catch((err) => {
            console.log('Something went wrong during updateIdea');
            console.log(err);
            res.status(400).json(err);
        })
}

const deleteIdea = (req, res) => {
    Idea.deleteOne({ _id: req.params.id })
    .then((deletedIdea) => {
        res.json(deletedIdea)
        console.log("Successfully deleted pet")
    })
        .catch((err) => {
            res.json(err)
            console.log("Did not Delete pet")
        })
    }

module.exports = {
    viewIdeas,
    createIdea,
    viewOneIdea,
    updateIdea,
    deleteIdea,
}