const mongoose = require('mongoose');


mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => {
    console.log(`you connected to the ${process.env.DB_NAME}`)
})

.catch((err) => {
console.log(`There was an error connecting to ${process.env.DB_NAME}`)
console.log(err)
})
