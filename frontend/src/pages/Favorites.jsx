import React, { useState, useEffect } from 'react'
import NavBar from '../components/Navbar';
import { useCookies } from "react-cookie";
import SearchedContentItem from '../components/SearchedContentItem'


/**
 */
export default function Favorites() {
    const [scale, setScale] = useState(1)
    const [error, setError] = useState(false)
    const [cookies] = useCookies([]);
    const [frames, setFrames] = useState([])

    const removeFrame = (id) => {
        setFrames(frames.filter(frame => frame._id != id))
    }

    const handleRemoveFavorite = (event, id) => {
        event.preventDefault();
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: '{"user_id":"' + cookies.id + '"}'
        };
        removeFrame(id)
        fetch('http://localhost:3001/user/favorite/' + id, options)
            .then(response => response.json())
            .catch(err => console.error(err));
    }

    useEffect(() => {
        document.title = "Shotfinder - Favorites";
        fetch('http://localhost:3001/user/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: '{"user_id":"' + cookies.id + '"}'65600c9db210a127be4e0fea
            body: '{"user_id":"65600c9db210a127be4e0fea"}'
        })
            .then(response => response.json())
            .then(response => setFrames(response))
            .catch(e => {
                setError(true)
                console.log("Error: ", e)
            })
    }, [])

    //filter content before display
    return <>
        {/* send setSearchTerm down to the searchbar component  */}
        <NavBar AdditionalComponent={<div></div>} />
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 mt-3 d-flex" style={{ textAlign: "right", paddingRight: "30px" }}>
                    <p className='mb-0 text-secondary me-auto ms-2 mt-1'>Showing {frames?.length} frames</p>
                    <div>
                        <input type="radio" className="btn-check" name="scale" id="small" defaultChecked onChange={(e) => (setScale(1))} />
                        <label className="btn btn-dark me-2" htmlFor="small">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-grid-3x3-gap-fill" viewBox="0 0 16 16">
                                <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z" />
                            </svg>
                        </label>

                        <input type="radio" className="btn-check" name="scale" id="med" onChange={(e) => (setScale(2))} />
                        <label className="btn btn-dark me-2" htmlFor="med">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-grid-fill" viewBox="0 0 16 16">
                                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                            </svg>
                        </label>

                        <input type="radio" className="btn-check" name="scale" id="large" onChange={(e) => (setScale(3))} />
                        <label className="btn btn-dark" htmlFor="large">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-square-fill" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                            </svg>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div className='container-fluid'>
            <div className='p-3'>
                <div className='searchedContentContainer'>
                    {frames?.map((item, index) => {
                        return <>
                            <a onClick={e => { handleRemoveFavorite(e, item._id) }} className='px-2' href='#'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                </svg>
                            </a>
                            <SearchedContentItem
                                key={index}
                                id={item._id}
                                url={"http://127.0.0.1:3001" + item.frameURL}
                                filmName={item.movieInfo.title}
                                tags={item.tags}
                                scale={scale} />


                        </>
                    })}
                    {error}
                </div>
                {/* // <SearchContent frames={frames} loading={false} error={false} scale={scale}/> */}
            </div>
        </div>

    </>
}