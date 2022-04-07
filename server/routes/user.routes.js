const UserController = require('../controllers/user.controller'); 
const {authenticate} = require('../config/jwt.config') 

module.exports = (app) => {
    app.post('/api/user/register', UserController.register); 
    app.post('/api/user/login', UserController.login);
    app.post('/api/user/logout', UserController.logout);
    app.get('/api/user', authenticate, UserController.loggedInUser);

        // app.get('/api/user/:id', UserController.viewOneUser); 
    // app.delete('/api/user/:id', UserController.deleteUser); 
    // app.put('/api/user/:id', UserController.updateUser);
}