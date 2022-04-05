const mongoose = require('mongoose');

const walkDB = "walkDB";

mongoose.connect("mongodb://localhost/" + walkDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => {
    console.log("you connected to the " + walkDB)
})
.catch((err) => {
console.log("There was an error connecting to " + walkDB)
console.log(err)
})