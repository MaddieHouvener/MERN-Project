import React from 'react'
import '../components/style.css';


export default props => {

    // const [loaded, setLoaded] = useState(false);
    const { daysOfWeek, workouts, setWorkouts, deleteWorkouts } = props;

    // useEffect(() => {
    //     axios.get('http://localhost:8020/workout')
    //         .then(res => {
    //             setWorkouts(res.data);
    //             setLoaded(true);
    //         });
    // }, []);

    // const removeFromDom = workoutId => {
    //     setWorkouts(workouts.filter(workouts => workouts._id !== workoutId));
    // }

    // const deleteWorkouts = (workoutId) => {
    //     axios.delete(`http://localhost:8020/workout/${workoutId}`)
    //         .then(res => {
    //             removeFromDom(workoutId)
    //             navigate("/")
    //         })
    //         .catch(err => console.log(err));
    // }

    console.log("this is the workouts from MAIN", workouts);

    return (
        <div>
            <div className="jumbotron">
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
                <h2>Workout manager</h2>
                <a href="/new" className="button4" style={{ "background-color": "pink", color: "grey" }}>Create workouts for your week</a>
            </div>
            {
                // loaded &&
                (
                    <table className="table table-hover table-dark" style={{ width: 550, color: 'aliceblue', margin: "auto", backgroundColor: "lightgrey", fontSize: "large" }}>
                        <thead >
                            <th style={{ display: "contents" }}>
                                Day
                            </th>
                            <th style={{ border: "white" }}>
                                Workout
                            </th>
                        </thead>
                        <tbody>
                            {daysOfWeek.map((day) => {
                                // Find right workout in workouts
                                // console.log("WORKOUTS from MAIN", workouts)
                                const defaultWorkout = {
                                    lifts: []
                                };
                                const correctWorkout = workouts.find((workout) => workout.day === day) || defaultWorkout;

                                return (
                                    <tr>
                                        <td>{day}</td>
                                        <td><a href={`/workout/${correctWorkout._id}`}>{correctWorkout.name}</a></td>
                                        <td>{correctWorkout.lifts.reps}</td>
                                        <td>
                                            <button style={{ color: "darkgrey" }} onClick={(e) => { deleteWorkouts(correctWorkout._id) }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
