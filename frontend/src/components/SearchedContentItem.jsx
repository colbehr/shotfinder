import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchedContentItem({ id, name, url, filmName, lastFrameElementRef }) {
    let randomNum = Math.random()
    let imageStyle = {
        backgroundImage: 'url(' + url + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: "150px",
        maxWidth: "350px",
        minWidth: "150px",
        // overflow: 'hidden',
        width: 180 + (randomNum * 120) + "px",
        flex: '1 0 auto',
        marginRight: '10px',
        marginBottom: '10px',


    };
    return (
        //html with tag component
        <div className='searchedContentItem' style={imageStyle} ref={lastFrameElementRef}>
            <Link to={"/search/" + id}>
                <div className='hoverContent'>
                    <h6>{filmName}</h6>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" className="bi bi-mouse favicon" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" className="bi bi-mouse scrollicon" viewBox="0 0 16 16">
                        <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm4 8a4 4 0 0 1-8 0V5a4 4 0 1 1 8 0v6zM8 0a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V5a5 5 0 0 0-5-5z" />
                    </svg>
                    <div className='tags'>
                        <p>Hat</p>
                        <p>Red Sky</p>
                        <p>Trees</p>
                        <p>Day</p>
                        <p>Close up</p>
                        <p>tag</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

