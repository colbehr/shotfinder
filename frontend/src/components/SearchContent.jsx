import React from 'react'
import SearchedContentItem from './SearchedContentItem'
import { useCookies } from "react-cookie";

/**
 * Handles the creation of each SearchedContentItem (frame)
 * @param {*} frames 
 * @param {*} loading 
 * @param {*} error 
 * @param {*} lastFrameElementRef 
 */
export default function SearchContent({ frames, loading, error, lastFrameElementRef, scale }) {
    const [cookies] = useCookies([]);

    const handleAddFavorite = (event, id) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"user_id":"' + cookies.id + '"}'
            // body: '{"user_id":"65600c9db210a127be4e0fea"}'
        };

        fetch('http://localhost:3001/user/favorite/' + id, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
    return (
        <div className='p-3'>
            <div className='searchedContentContainer'>
                {frames.map((item, index) => {
                    if (frames.length === index + 1) {
                        return <SearchedContentItem
                            key={item._id}
                            lastFrameElementRef={lastFrameElementRef}
                            id={item._id}
                            url={"http://127.0.0.1:3001" + item.frameURL}
                            filmName={item.movieInfo.title}
                            tags={item.tags}
                            scale={scale}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" className="bi bi-mouse favicon" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                            }
                            buttonFunction={(event, id) => {
                                event.preventDefault();
                                const options = {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: '{"user_id":"' + cookies.id + '"}'
                                    // body: '{"user_id":"65600c9db210a127be4e0fea"}'
                                };

                                fetch('http://localhost:3001/user/favorite/' + id, options)
                                    .then(response => response.json())
                                    .then(response => console.log(response))
                                    .catch(err => console.error(err));
                            }} />

                    }
                    return <SearchedContentItem
                        key={item._id}
                        id={item._id}
                        url={"http://127.0.0.1:3001" + item.frameURL}
                        filmName={item.movieInfo.title}
                        tags={item.tags}
                        scale={scale}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" className="bi bi-mouse favicon" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        }
                        buttonFunction={handleAddFavorite} />
                })}
            </div>
            <div className='text-center mt-5 text-secondary'>
                {loading ? <div className="spinner-border text-light" role="status"></div> : ""}
            </div>
            <div className='text-center mt-5 text-secondary'> {error && 'Error'}</div>
            <div className='text-center mt-5 text-secondary'> {!loading ? "No more frames to load... 😢" : ""} </div>
        </div>
    )
}
