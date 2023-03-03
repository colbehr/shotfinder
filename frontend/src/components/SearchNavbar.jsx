import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

// setSearchTerm gets sent to the search bar component so the input can send data to the search page
export default function SearchNavBar({ setSearchTerm }) {
    let activeStyle = {
        textDecoration: "underline",
    };

    return <nav className="nav">
        <div className="container-fluid">
            <div className="row justify-content-between ">
                <div className="col-2">
                    <a href="/" className="logo-text">ShotFinder</a></div>
                <div className="col-5">
                    <SearchBar setSearchTerm={setSearchTerm} />
                </div>
                <div className="col-2 d-flex justify-content-end">
                    <ul className="h-100 ">
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
                </div>
            </div>
        </div>

    </nav>
}