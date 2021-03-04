const { Workout } = require('../models/products.models');

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.createWorkouts = (request, response) => {
    const { name, lifts: [{ liftName, reps, sets }], isCompleted, day } = request.body;
    Workout.create({
        name,
        lifts: [{
            liftName,
            reps,
            sets
        }],
        isCompleted,
        day
    })
        .then(workouts => response.json(workouts))
        .catch(err => {
            console.log('err: ', err);
            return response.status(400).json(err);
        });
}

//finding all authors - read the authors
module.exports.getAllWorkouts = (request, response) => {
    //.sort is case sensitive so whatever is being typed in has to be Capitlized(this sorts the data alphabetically)
    Workout.find().sort("name")
        .then(allWorkouts => response.json(allWorkouts))
        .catch(err => response.json(err))
}

//finding just one author - read one product
module.exports.getWorkouts = (request, response) => {
    Workout.findOne({ _id: request.params.id })
        .then(workouts => response.json(workouts))
        .catch(err => response.json(err));
}

//updating a author with db
module.exports.updateWorkouts = (request, response) => {
    Workout.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true, runValidators: true })
        .then(updateWorkouts => response.json(updateWorkouts))
        .catch(err => response.status(400).json(err))
}

//deleting products
module.exports.deleteWorkouts = (request, response) => {
    Workout.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
