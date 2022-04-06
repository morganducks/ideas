const IdeaController = require('../controllers/idea.controller');  

module.exports = (app) => {
    app.post('/api/ideas', IdeaController.createIdea); 
    app.get('/api/ideas', IdeaController.viewIdeas); 
    // app.get('/api/ideas/:id', IdeaController.viewOneIdea); 
    // app.delete('/api/ideas/:id', IdeaController.deleteIdea); 
    // app.put('/api/ideas/:id', IdeaController.updateIdea);
    // app.delete('/api/ideas/:id', IdeaController.deleteIdea); 
    // app.put('/api/ideas/:id', IdeaController.updateIdea);
}