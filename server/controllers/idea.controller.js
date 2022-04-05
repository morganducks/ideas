const Walk = require('../models/idea.model');

const createWalk = (req, res) => {
    Walk.create(req.body)
        .then((createWalk) => {
            res.json(createWalk);
            console.log("You created a pet!")
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
            console.log('Something went wrong during createWalk');
        })
}

const viewWalks = (req, res) => {
    Walk.find({})
        .then((viewWalks) => {
            res.json(viewWalks)
            console.log("You found the pets")
        })
        .catch((err) => {
            res.json(err)
            console.log("Something went wrong with view pets")
        });
}

const viewOneWalk = (req, res) => {
    Walk.findOne({ _id: req.params.id })
        .then(viewOneWalk => res.json(viewOneWalk))
        .catch(err => res.json(err));
}

const updateWalk = (req, res) => {
    console.log("editing...")
    Walk.findOneAndUpdate({ _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then((updateWalk) => {
            res.json(updateWalk);
            console.log(updateWalk);
            console.log("Successfully updated pet")
        })
        .catch((err) => {
            console.log('Something went wrong during updateWalk');
            console.log(err);
            res.status(400).json(err);
        })
}

const deleteWalk = (req, res) => {
    Walk.deleteOne({ _id: req.params.id })
    .then((deletedWalk) => {
        res.json(deletedWalk)
        console.log("Successfully deleted pet")
    })
        .catch((err) => {
            res.json(err)
            console.log("Did not Delete pet")
        })
    }

module.exports = {
    viewWalks,
    createWalk,
    viewOneWalk,
    updateWalk,
    deleteWalk,
}