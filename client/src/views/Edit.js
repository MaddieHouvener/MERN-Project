import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { navigate, Link } from '@reach/router';

export default props => {

    const { id } = props;
    const [title, setTitle] = useState("");
    const [store, setStore] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8020/product/' + id)
            .then(res => {
                setTitle(res.data.title);
                setStore(res.data.store);
                setLoaded(true);
            })
    }, [])

    const updateProducts = e => {
        e.preventDefault();
        axios.put('http://localhost:8020/product/' + id, {
            title,
            store
        })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => { // setting validaitons for editing
                console.log(err);
                const errorResponse = err.response.data.errors;
                const errorArr = []
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            });
    }

    return (
        <div>
            <h1>Update a Product</h1>
            {errors.map((err, index) => <p style={{ color: "red" }} key={index}>{err}</p>)}
            <form onSubmit={updateProducts}>
                <p>
                    <label>Title</label><br />
                    <input type="text"
                        name="title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }} />
                </p>
                <p>
                    <label>Store</label><br />
                    <input type="text"
                        name="price"
                        value={store}
                        onChange={(e) => { setStore(e.target.value) }} />
                </p>
                <input type="submit" />
                <Link to="/">Cancel</Link>
            </form>
        </div>
    )
}