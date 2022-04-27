const ReplyController = require("../controllers/replies.controller");


module.exports = (app) => {

    app.get("/api/replies", ReplyController.findAllReplies);
    app.post("/api/replies/:id", ReplyController.createNewReply);
    app.put("/api/replies/:id", ReplyController.likeReply);
    // app.get("/api/replies/:id", ReplyController.findOneReply);
}