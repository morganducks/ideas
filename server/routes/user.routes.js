const UserController = require('../controllers/user.controller');  

module.exports = (app) => {
    app.post('/api/user/register', UserController.register); 
    app.post('/api/user/login', UserController.login);
    app.post('/api/user/logout', UserController.logout);
    app.get('/api/user', UserController.loggedInUser);

        // app.get('/api/user/:id', UserController.viewOneUser); 
    // app.delete('/api/user/:id', UserController.deleteUser); 
    // app.put('/api/user/:id', UserController.updateUser);
}