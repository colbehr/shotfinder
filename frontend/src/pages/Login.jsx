
// https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "test@gmail.com",
        password: "password",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) => {
        console.log(err);
        setError(err);
        setLoading(false);
    };

    const handleSuccess = (msg) => {
        console.log(msg);
        setTimeout(() => navigate("/search"), 200);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(
                "http://127.0.0.1:3001/login",
                { ...inputValue },
                { withCredentials: true }
            );

            document.cookie = 'token=' + data.token
            document.cookie = 'id=' + data.id

            console.log("Cookies from response:", document.cookie);
            console.log("Data from response:", data);

            const { success, message } = data;

            success ? handleSuccess(message) : handleError(message);
        } catch (error) {
            console.error(error);
            handleError("An error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form_container w-100 p-4 d-flex justify-content-center pb-4 mt-5">
            {loading &&
                <div className="form-outline mb-4 text-center">
                    <p>Logging in</p>
                    <div className="spinner-border text-light" role="status"></div>
                </div>
            }
            {!loading && <form style={{ width: 22 + "rem" }} onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                    <h2 className="mb-4">Login</h2>

                    <label className="form-label" htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={inputValue.email}
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
                        value={inputValue.password}
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