const WalkController = require('../controllers/walkstars.controller');  

module.exports = (app) => {
    app.post('/api/walks', WalkController.createWalk); 
    app.get('/api/walks', WalkController.viewWalks); 
    app.get('/api/walks/:id', WalkController.viewOneWalk); 
    app.delete('/api/walks/:id', WalkController.deleteWalk); 
    app.put('/api/walks/:id', WalkController.updateWalk);
}