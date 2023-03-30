import React from 'react'
import SearchedContentItem from './SearchedContentItem'

/**
 * Handles the creation of each SearchedContentItem (frame)
 * @param {*} frames 
 * @param {*} loading 
 * @param {*} error 
 * @param {*} lastFrameElementRef 
 */
export default function SearchContent({ frames, loading, error, lastFrameElementRef, scale}) {
    return (
        <div className='p-3'>
            <div className='searchedContentContainer'>
                {frames.map((item, index) => {
                    if (frames.length === index + 1) {
                        return <SearchedContentItem
                            key={item._id}
                            lastFrameElementRef={lastFrameElementRef}
                            id={item._id}
                            url={item.frameURL}
                            filmName={item.movieInfo.title}
                            tags={item.tags} 
                            scale={scale}/>

                    }
                    return <SearchedContentItem
                        key={item._id}
                        id={item._id}
                        url={item.frameURL}
                        filmName={item.movieInfo.title}
                        tags={item.tags} 
                        scale={scale}/>
                })}
            </div>
            <div className='text-center mt-5 text-secondary'> 
                {loading ? <div className="spinner-border text-light" role="status"></div> : ""}
            </div>
            <div className='text-center mt-5 text-secondary'> {error && 'Error'}</div>
            <div className='text-center mt-5 text-secondary'> {!loading ?  "No more frames to load... 😢" : "" } </div>
        </div>
    )
}
