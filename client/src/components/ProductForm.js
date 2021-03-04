import React, { useState } from 'react';
import { Paper, StylesProvider, FormControl, Button, OutlinedInput, InputLabel } from '@material-ui/core';


export default props => {

    const [name, setName] = useState("");
    const [liftName, setLiftName] = useState("");
    const [day, setDay] = useState("");
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false)
    const { onSubmitProp } = props;

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({
            name,
            lifts: [{
                liftName,
                reps,
                sets
            }],
            isCompleted,
            day
        });
    }

    return (
        <Paper elevation={3} style={StylesProvider.paper}>
            <form onSubmit={onSubmitHandler} style={{ display: "inline-grid" }}>
                <h2>Workout Manager</h2>
                <FormControl varient="outlined" style={StylesProvider.input}>
                    <InputLabel>Name of Workout</InputLabel><br />
                    <OutlinedInput type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                </FormControl>
                <FormControl varient="outlined" style={StylesProvider.input}>
                    <InputLabel>Lift</InputLabel><br />
                    <OutlinedInput type="text" value={liftName} onChange={(e) => { setLiftName(e.target.value) }} />
                </FormControl>
                <FormControl varient="outlined" style={StylesProvider.input}>
                    <label for="points">Reps</label>
                    <input type="number" id="points" name="reps" value={reps} step="1" onChange={(e) => { setReps(e.target.value) }} />
                    <label for="points">Sets</label>
                    <input type="number" id="points" name="sets" value={sets} step="1" onChange={(e) => { setSets(e.target.value) }} />
                </FormControl>
                <FormControl varient="outlined" style={StylesProvider.input}>
                    <label htmlFor="select">Day of the Week</label>
                    <select value={day} name="select" id="select" onChange={e => setDay(e.target.value)}>
                        <option value="">Choose a Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </FormControl>

                <Button type="submit" varient="contained" color="primary" className="button4" style={{ "background-color": "pink", color: "grey" }}>Submit</Button>
            </form>
        </Paper>
    )
}
