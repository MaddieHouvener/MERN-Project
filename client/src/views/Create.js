import React, { useState } from 'react'
import axios from 'axios';
import { Paper, StylesProvider, FormControl, Button, OutlinedInput, InputLabel } from '@material-ui/core';
import ProductForm from '../components/ProductForm';
import { navigate, Link } from '@reach/router';

export default props => {

    const [errors, setErrors] = useState([]);
    const { workouts, setWorkouts } = props;
    // const [products, setProducts] = useState([]);

    const createWorkouts = workout => {
        console.log('create workout: ', workout);
        axios.post("http://localhost:8020/workout", workout)
            .then(res => {
                console.log('create res: ', res);
                setWorkouts([...workouts, res.data]);
                navigate('/')
            })
            .catch(err => {
                console.log("this is the error:", err)
                const errorResponse = err.response.data.errors;
                const errorArr = []
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <Link to='/' className="button4" style={{ "background-color": "pink", color: "grey", margin: 15 }}>Home</Link>
            {errors.map((err, index) => <p style={{ color: "red" }} key={index}>{err}</p>)}
            <ProductForm onSubmitProp={createWorkouts} />
        </div>
    )
}
