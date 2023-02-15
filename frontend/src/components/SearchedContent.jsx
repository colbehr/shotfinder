import React from 'react'
import SearchedContentItem from './SearchedContentItem'

export default function SearchedContent( {content}) {
  return (
    <div className='searchedContentContainer'>
      {/* array of searchedcontentitems */}

      {content.map(item => {
        return <SearchedContentItem key={item._id} 
                name={item.name}
                url={item.frameURL}
                filmName={item.filmName}/>
      })}
    </div>
  )
}
