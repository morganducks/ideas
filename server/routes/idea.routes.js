const WalkController = require('../controllers/idea.controller');  

module.exports = (app) => {
    app.post('/api/ideas', WalkController.createWalk); 
    app.get('/api/ideas', WalkController.viewWalks); 
    app.get('/api/ideas/:id', WalkController.viewOneWalk); 
    app.delete('/api/ideas/:id', WalkController.deleteWalk); 
    app.put('/api/ideas/:id', WalkController.updateWalk);
}