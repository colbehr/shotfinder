import React from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag';






/**
 * A small image for display in searches,
 * has hover effect that shows tags and title
 * 
 * @param {*} id - for the link
 * @param {*} url - frame image url
 * @param {*} filmName - frame title
 * @param {*} lastFrameElementRef - passed if its the last frame in the set for infinite scroll
 * @param {*} tags - tags to display
 * @param {*} icon - icon to display in corner
 * @param {*} buttonFunction - function for button in corner
 * @returns 
 */
export default function SearchedContentItem({ id, url, filmName, lastFrameElementRef, tags, scale, icon, buttonFunction }) {



    let randomNum = Math.random()
    url = url.replace('\\', '/')
    let imageStyle = {
        backgroundImage: `url('${url}')`,
        height: "150px",
        maxWidth: "350px",
        minWidth: "200px",
        width: (randomNum * 200) + "px",
    };
    if (scale === 2) {
        imageStyle = {
            backgroundImage: `url('${url}')`,
            height: "225px",
            maxWidth: "500px",
            minWidth: "300px",
            width: (randomNum * 200) + "px",
        };
    } else if (scale === 3) {
        imageStyle = {
            backgroundImage: `url('${url}')`,
            height: "325px",
            // maxWidth: "800px",
            minWidth: "550px",
            width: (randomNum * 450) + "px",
        };
    } else if (scale === 0) {
        imageStyle = {
            backgroundImage: `url('${url}')`,
            height: "40px",
            maxWidth: "60px",
            minWidth: "40px",
            margin: 0,
            borderRadius: 0,
            width: (randomNum * 40) + "px",
        };
    }

    return (
        <div className='searchedContentItem' style={imageStyle} ref={lastFrameElementRef}>
            <Link to={"/search/" + id}>
                <div className='hoverContent'>
                    <h6>{filmName}</h6>
                    <div onClick={e => { buttonFunction(e, id) }}>
                        {icon}
                    </div>

                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" className="bi bi-mouse scrollicon" viewBox="0 0 16 16">
                        <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm4 8a4 4 0 0 1-8 0V5a4 4 0 1 1 8 0v6zM8 0a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V5a5 5 0 0 0-5-5z" />
                    </svg> */}

                    <div className='tags'>
                        {tags.map((tag, index) => {
                            tag = tag.trim()
                            return <Tag index={index} tag={tag} key={index} />
                        })}
                    </div>
                </div>
            </Link>
        </div>
    )
}

