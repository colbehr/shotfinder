import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        console.log("No Token")
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://127.0.0.1:3001/userVerification",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? console.log("Logged In")
        : (removeCookie("token"), console.log("Not Logged in"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <>
      <div className="">
        <h4>
          {" "}
          Welcome, <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
    </>
  );
};

export default Home;
