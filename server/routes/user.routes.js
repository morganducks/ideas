const UserController = require('../controllers/user.controller'); 
const {authenticate} = require('../config/jwt.config') 
const User  = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

module.exports = (app) => {
    app.post('/api/user/register', UserController.register); 
    app.post('/api/user/login', UserController.login);
    app.post('/api/user/logout', UserController.logout);
    app.get('/api/user', authenticate, UserController.loggedInUser);
    app.put('/api/user/:userId', UserController.updateUserLikes);


}

