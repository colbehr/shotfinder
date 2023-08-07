// Home.js
import useVerificationHook from "../services/useVerificationHook";

import { Link } from 'react-router-dom'
const Home = () => {
  const { username, logout } = useVerificationHook();

  return (
    <>
      <div className="">
        <h4>
          Welcome, <span>{username}</span>
        </h4>
        <button onClick={logout}>LOGOUT</button>
        <br></br>
        <Link to={"/search/"}>Search Frame DB</Link>
      </div>
    </>
  );
};

export default Home;
