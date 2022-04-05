const mongoose = require('mongoose');

const ideaDB = "ideaDB";

mongoose.connect("mongodb://localhost/" + ideaDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => {
    console.log("you connected to the " + ideaDB)
})
.catch((err) => {
console.log("There was an error connecting to " + ideaDB)
console.log(err)
})