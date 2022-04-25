require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const socket = require('socket.io');
const cookieParser = require("cookie-parser")

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


require('./config/mongoose.config');    
require('./routes/idea.routes')(app);
require('./routes/user.routes')(app);

app.listen(process.env.MY_PORT, () => console.log(`Listening at Port ${process.env.MY_PORT}`))

const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
})

io.on("connection", (socket) => {
    console.log("socket.id " + socket.id);

    socket.on("Update_chat", (data) => {
        console.log("The payload: ", data);
        io.emit("Update_chat_likes", data);
    })
})