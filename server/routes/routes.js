const WorkoutsController = require('../controllers/products.controllers');
module.exports = function (app) {
    app.get('/', WorkoutsController.index);
    app.post('/workout', WorkoutsController.createWorkouts);
    app.get('/workout', WorkoutsController.getAllWorkouts);
    app.get('/workout/:id', WorkoutsController.getWorkouts);
    app.put('/workout/:id', WorkoutsController.updateWorkouts);
    app.delete('/workout/:id', WorkoutsController.deleteWorkouts);
}
