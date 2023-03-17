import { NavLink } from "react-router-dom";

// setSearchTerm gets sent to the search bar component so the input can send data to the search page
// Takes a middle component, so we can add a searchbar, loading bar , or nothing based on which page we are on.
export default function NavBar({MiddleComponent}) {
    let activeStyle = {
        textDecoration: "underline",
    };

    return <nav className="nav">
        <div className="container-fluid">
            <div className="row justify-content-between ">
                <div className="col-2">
                    <NavLink to="/search" className="logo-text"> 
                        ShotFinder
                    </NavLink>
                </div>
                <div className="col-5">
                    {MiddleComponent}
                </div>
                <div className="col-2 d-flex justify-content-end">
                    <ul className="h-100 ">
                        <li>
                            <NavLink
                                to="/upload"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }>
                                Upload
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/search"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }>
                                Search
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </nav>
}