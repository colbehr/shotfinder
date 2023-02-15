import React from 'react'
import SearchedContentItem from './SearchedContentItem'
import { Link } from 'react-router-dom'
export default function SearchedContent( {content}) {
  return (
      <div className='searchedContentContainer'>
        {/* array of searchedcontentitems */}

        {content.map(item => {
          return <>
            <Link style={{ textDecoration: 'none' }} to={"/search/" + item._id}>
              <SearchedContentItem key={item._id} 
                  name={item.name}
                  url={item.frameURL}
                  filmName={item.filmName}/>
            </Link>
          </>
        })}
      </div>
  )
}
