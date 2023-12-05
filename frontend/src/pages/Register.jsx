import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [errorValue, setErrorValue] = useState("")
    const [inputValue, setInputValue] = useState({
        email: "test@gmail.com",
        password: "password",
        username: "Test User",
    });
    const { email, password, username } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) => {
        console.log(err);
        setErrorValue(err)
    }
    // toast.error(err, {
    //   position: "bottom-left",
    // });
    const handleSuccess = (msg) =>
        console.log(msg);
    // toast.success(msg, {
    //   position: "bottom-right",
    // });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://127.0.0.1:3001/signup",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 0);
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
            username: "",
        });
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
                        value={email}
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
                        value={username}
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
                        value={password}
                        className="form-control"
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="text-warning">
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
