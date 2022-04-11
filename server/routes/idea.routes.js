const IdeaController = require('../controllers/idea.controller');  
const {authenticate} = require('../config/jwt.config') 

module.exports = (app) => {
    app.post('/api/ideas', authenticate, IdeaController.createIdea); 
    app.get('/api/ideas', authenticate, IdeaController.viewIdeas); 
    app.get('/api/ideasbyuser/:userName', authenticate, IdeaController.findIdeasByUser); 
    app.delete('/api/ideas/:id', IdeaController.deleteIdea); 
    app.put('/api/ideas/:id', IdeaController.updateIdea);
    // app.delete('/api/ideas/:id', IdeaController.deleteIdea); 
    // app.put('/api/ideas/:id', IdeaController.updateIdea);
}