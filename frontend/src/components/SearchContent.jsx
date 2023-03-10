import React from 'react'
import SearchedContentItem from './SearchedContentItem'

export default function SearchContent({ frames, loading, error, lastFrameElementRef }) {
    return (
        <div className='p-3'>
            <div className='searchedContentContainer'>
                {frames.map((item, index) => {
                    if (frames.length === index + 1) {
                        return <SearchedContentItem
                            key={item._id}
                            lastFrameElementRef={lastFrameElementRef}
                            id={item._id}
                            name={item.name}
                            url={item.frameURL}
                            filmName={item.title} />

                    }
                    return <SearchedContentItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        url={item.frameURL}
                        filmName={item.title} />
                })}
            </div>
            <div className='text-center mt-5 text-secondary'> {loading && 'Loading more...'}</div>
            <div className='text-center mt-5 text-secondary'> {error && 'Error'}</div>
            <div className='text-center mt-5 text-secondary'> No frames... 😢  </div>
        </div>
    )
}
