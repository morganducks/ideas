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
require("./routes/replies.routes")(app);

const server = app.listen(8000, ()=>console.log("You are connected to port 8000"))

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