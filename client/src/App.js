import { Router, navigate } from '@reach/router';
import './App.css';
import axios from 'axios';

import Main from './views/Main';
import Create from './views/Create';
import Info from './views/Info';
import { useState, useEffect } from 'react';

function App() {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [workouts, setWorkouts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  console.log('HI IM MADDIE');

  // Fetch initial workouts
  useEffect(() => {
    // console.log('IN USE EFFECT');
    axios.get("http://localhost:8020/workout/")
      .then(res => {
        setWorkouts(res.data)
        setLoaded(true);
      });
  }, []);

  const updateWorkoutState = (changedWorkout, id) => {
    setWorkouts(workouts.map(workout => {
      if (workout._id === id) {
        console.log("workout ID is: ", workout._id)
        console.log("this is the regular id", id)
        return changedWorkout;
      }
      return workout;
    }));
  }

  const updateWorkout = (data, id) => {
    axios.put(`http://localhost:8020/workout/${id}`, data)
      .then(res => {
        // getAll();
        updateWorkoutState(res.data, id);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const removeFromDom = workoutId => {
    setWorkouts(workouts.filter(workout => workout._id !== workoutId))
  }

  const deleteWorkouts = (workoutId) => {
    axios.delete(`http://localhost:8020/workout/${workoutId}`)
      .then(res => {
        removeFromDom(workoutId)
        navigate("/")
      })
      .catch(err => console.log(err));
  }

  const checkBoxHandler = (completed, id) => {
    console.log("this is completed!!!", completed);
    console.log('id: ', id);
    updateWorkout({ isCompleted: completed }, id);
  }


  console.log('workouts APP: ', workouts);

  return (
    <div className="App">
      <Router>
        <Main path="/" daysOfWeek={daysOfWeek} workouts={workouts} setWorkouts={setWorkouts} deleteWorkouts={deleteWorkouts} />
        <Create path="/new" workouts={workouts} setWorkouts={setWorkouts} />
        <Info path="/workout/:id" workouts={workouts} updateWorkout={updateWorkout} setWorkouts={setWorkouts} checkBoxHandler={checkBoxHandler} deleteWorkouts={deleteWorkouts} />
      </Router>
    </div>
  );
}

export default App;
