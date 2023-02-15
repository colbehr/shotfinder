import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar(){
    let activeStyle = {
        textDecoration: "underline",
    };

    return <nav className="nav">
        <a href="/" className="site-title">Logo</a>
        <SearchBar/>
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