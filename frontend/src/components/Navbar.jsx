import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg"
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
            <div className="row justify-content-between h-100">
                <div className="col-2">
                    <NavLink to="/search" className="logo-text">
                        <img src={logo} className="logo" height={"40px"} alt="logo" />
                    </NavLink>
                </div>
                <div className="col-5 d-flex align-items-center">
                    <div className="w-100">{AdditionalComponent}</div>
                </div>
                <div className="col-2 d-flex justify-content-end">
                    <ul className="">
                        <li>
                            <NavLink
                                to="/upload"
                                style={({ isActive }) => isActive ? activeStyle : undefined}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                </svg>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/search"
                                style={({ isActive }) => isActive ? activeStyle : undefined}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </nav>
}