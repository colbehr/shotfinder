// Home.js

import { Link } from 'react-router-dom'
const Home = () => {

  return (
    <>
      <div className="">
        <h4>Landing Page
        </h4>
        <br></br>
        <Link to={"/search"}>Search Frame DB</Link>
      </div>
    </>
  );
};

export default Home;
