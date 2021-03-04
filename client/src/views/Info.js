import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Router, Link, navigate } from '@reach/router';
import '../components/style.css';


export default props => {

    const { id, updateWorkout, setWorkouts, checkBoxHandler, deleteWorkouts, workouts } = props;
    const defaultWorkout = { lifts: [] };
    const [workout, setWorkout] = useState(defaultWorkout);
    const [isCompleted, setIsCompleted] = useState(false);


    useEffect(() => {
        axios.get("http://localhost:8020/workout/" + id)
            .then(res => {

                console.log('res.data: ', res.data);
                setWorkout(res.data);
                setIsCompleted(true);

            });
    }, [])

    console.log('workout: ', workout);

    return (
        <div>
            <Link to="/" className="button4" style={{ "background-color": "pink", color: "grey" }}>Home</Link>
            <h2>Workout Details</h2>
            <h3>{workout.name}</h3>
            <p>{workout.day}</p>
            {workout.lifts.map((lift) => {
                return (
                    <div>
                        <p>Lift: {lift.liftName}</p>
                        <p>Reps: {lift.reps}</p>
                        <p>Sets: {lift.sets}</p>
                    </div>
                );
            })}
            <form>
                <input type="checkbox" checked={workout.completed} onChange={e => checkBoxHandler(e.target.checked, workout._id)} />Completed
            </form>
            <button className="button4" style={{ "background-color": "pink", color: "grey", padding: 4, borderRadius: 4, margin: 5 }} onClick={(e) => { deleteWorkouts(workout._id) }}>
                Delete
                </button>
            <a href="#" style={{ marginTop: 400, bottom: 10, display: "block" }}>Link your spotify playlist to this work out, for extra motivation</a>
        </div>

    )
}