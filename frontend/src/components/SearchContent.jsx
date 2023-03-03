import React from 'react'
import SearchedContentItem from './SearchedContentItem'

export default function SearchContent({frames, loading, error, lastFrameElementRef}) {
  return (
            <div className='p-3'>
                <div className='searchedContentContainer'>
                {frames.map((item, index) => {
                    if (frames.length === index + 1) {
                    return <div ref={lastFrameElementRef} key={item._id}>
                        <SearchedContentItem
                        id={item._id}
                        name={item.name}
                        url={item.frameURL}
                        filmName={item.title} />
                        </div>
                    } 
                    return <div key={item._id}>
                        <SearchedContentItem
                        id={item._id}
                        name={item.name}
                        url={item.frameURL}
                        filmName={item.title} />
                    </div>

                })}
                </div>
                <div> {loading && 'Loading more...'}</div>
                <div> {error && 'Error'}</div>
            </div>
  )
}
