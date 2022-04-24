const IdeaController = require('../controllers/idea.controller');  
const {authenticate} = require('../config/jwt.config') 

module.exports = (app) => {
    app.post('/api/ideas', authenticate, IdeaController.createIdea); 
    app.get('/api/ideas', IdeaController.viewIdeas); 
    app.get('/api/ideasByUser/:userName', authenticate, IdeaController.findIdeasByUser); 
    app.delete('/api/ideas/:id', IdeaController.deleteIdea); 
    // app.put('/api/ideas/:id', IdeaController.updateIdea);
    app.put('/api/ideas/:likes', IdeaController.updateIdea);
    // app.delete('/api/ideas/:id', IdeaController.deleteIdea); 
    // app.put('/api/ideas/:id', IdeaController.updateIdea);
}