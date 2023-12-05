// useVerificationHook.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const useVerificationHook = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(["token", "id"]);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                console.log("No Token");
                navigate("/login");
                return;
            }
            const { data } = await axios.post(
                "http://127.0.0.1:3001/userVerification",
                {},
                { withCredentials: true }
            );
            const { status, user, email } = data;
            setUsername(data.user.username);
            setEmail(data.user.email);
            // console.log("data", data);
            //if logged in, do nothing, otherwise delete the cookies and redirect to login screen
            return status
                ? null
                : (removeCookie("token"),
                    removeCookie("id"),
                    console.log("Not Logged in"),
                    navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const logout = () => {
        removeCookie("token");
        navigate("/login");
    };
    return { email, username, logout };
};

export default useVerificationHook;
