import { NavLink } from "react-router-dom";

export default function Navbar(){
    let activeStyle = {
        textDecoration: "underline",
    };

    let activeClassName = "underline";

    return <nav className="nav">
        <a href="/" className="site-title">Logo</a>
        <ul>
            <li>
                <NavLink
                    to="Upload"
                    style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }>
                    Upload
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="Search"
                    style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }>
                    Search
                </NavLink>
            </li>
        </ul>
    </nav>
}