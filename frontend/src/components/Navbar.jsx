import { NavLink } from "react-router-dom";

/**
 * Takes a additional Component, so we can add a searchbar, loading bar, or nothing based on which page we are on.
 * 
 * @param {*} AdditionalComponent 
 */
export default function NavBar({ AdditionalComponent }) {
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
                    {AdditionalComponent}
                </div>
                <div className="col-2 d-flex justify-content-end">
                    <ul className="h-100 ">
                        <li>
                            <NavLink
                                to="/upload"
                                style={({ isActive }) => isActive ? activeStyle : undefined}>
                                Upload
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/search"
                                style={({ isActive }) => isActive ? activeStyle : undefined}>
                                Search
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </nav>
}