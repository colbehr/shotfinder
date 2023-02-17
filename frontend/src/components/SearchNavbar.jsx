import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

// setSearchTerm gets sent to the search bar component so the input can send data to the search page
export default function SearchNavBar( {setSearchTerm} ){
    let activeStyle = {
        textDecoration: "underline",
    };

    return <nav className="nav">
        <a href="/" className="site-title">Logo</a>
        <SearchBar setSearchTerm={setSearchTerm}/>
        <ul>
            <li>
                <NavLink
                    to="/Upload"
                    style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }>
                    Upload
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/Search"
                    style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }>
                    Search
                </NavLink>
            </li>
        </ul>
    </nav>
}