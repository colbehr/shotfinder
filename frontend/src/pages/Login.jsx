
// https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/#howtoimplementthebackend
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({ email: "test@gmail.com", password: "password", });
    // Add a state variable to track the loading status 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { email, password } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue(
            {
                ...inputValue,
                [name]: value,
            });
    };

    const handleError = (err) => {
        console.log(err);
        setError(err)
        setLoading(false);
    }
    const handleSuccess = (msg) =>
        console.log(msg);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Set the loading status to true when the user submits the form
        setLoading(true);
        try {
            const { data } = await axios.post(
                "http://127.0.0.1:3001/login",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            console.log(data);
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/search");
                }, 200);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
        });
        // Set the loading status to false when the request is done

    };

    return (
        <div className="form_container w-100 p-4 d-flex justify-content-center pb-4 mt-5">
            {/* Add a conditional rendering for the spinner component */}
            {loading &&
                <div className="form-outline mb-4 text-center">
                    <p>Logging in</p>
                    <div className="spinner-border text-light" role="status"></div>
                </div>
            }
            {!loading && <form style={{ width: 22 + "rem" }} onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        className="form-control"
                        placeholder="Enter your email"
                        onChange={handleOnChange}
                    />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        className="form-control"
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-outline mb-4 text-warning">
                    {error}
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>


                <div className="text-center">
                    <p>Not a member? <Link to={"/register"}>Register</Link></p>
                </div>
            </form>}
        </div>
    );
};

export default Login;