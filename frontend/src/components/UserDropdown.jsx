import React from 'react';
import { Link } from "react-router-dom";
import '../assets/Dropdown.css';
import GradientImage from './GradientImage';
// import useVerificationHook from "../services/useVerificationHook";
// https://codepen.io/anitaparmar26/pen/mdExWPZ
export default function UserDropdown() {
    // const { email, username, logout } = useVerificationHook();
    const { email, username, logout } = { email: "test@test.com", username: "Username", logout: () => { } };

    return (
        <ul className="list-unstyled profile">
            <li className="dropdown ml-2">
                <a
                    className="rounded-circle "
                    href="#avatar"
                    role="button"
                    id="dropdownUser"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <div className="avatar avatar-md">
                        <GradientImage text={email}></GradientImage>
                    </div>
                </a>

                <div className="dropdown-menu pb-2" aria-labelledby="dropdownUser">
                    <div className="dropdown-item profile-row">
                        <div className="d-flex py-2">
                            <div className="avatar avatar-md dropdownAvatar">
                                <GradientImage text={email}></GradientImage>
                            </div>
                            <div className="ml-3 lh-1">
                                <h5 className="mb-0">{username}</h5>
                                <p className="mb-0">{email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown-divider my-0"></div>
                    <div className="">
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/upload" className="dropdown-item" >
                                    Upload New Frames
                                </Link>
                            </li>
                            <li>
                                <Link to="/favorites" className="dropdown-item" >
                                    Favorites
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown-divider my-0"></div>
                    <ul className="list-unstyled">
                        <li>
                            <Link to="/login" className="dropdown-item" onClick={logout}>
                                Sign Out
                            </Link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    );
}

