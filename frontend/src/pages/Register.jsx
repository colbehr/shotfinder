import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [errorValue, setErrorValue] = useState("");
    const [inputValue, setInputValue] = useState({
        email: "test@gmail.com",
        password: "password",
        username: "Test User",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) => {
        console.log(err);
        setErrorValue(err);
    };

    const handleSuccess = (msg) => {
        console.log(msg);
        setTimeout(() => navigate("/"), 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "http://127.0.0.1:3001/signup",
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
            console.log(error);
        }

        // setInputValue({ email: "", password: "", username: "" });
    };


    return (
        <div className="form_container w-100 p-4 d-flex justify-content-center mt-5">
            <form onSubmit={handleSubmit} style={{ width: 22 + "rem" }}>
                <h2 className="mb-4">Register</h2>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={inputValue.email}
                        className="form-control"
                        placeholder="Enter your email"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="email">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={inputValue.username}
                        className="form-control"
                        placeholder="Enter your username"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={inputValue.password}
                        className="form-control"
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="text-warning mb-4">
                    {errorValue}
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
                <div className="text-center">
                    Already have an account? <Link to={"/login"}>Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
