import React from 'react'

export default function SearchedContentItem({name, url, filmName}) {
  return (
    //html with tag component
    <div>
        <h6>{name}</h6>
        <img src={url} alt={filmName + " Frame"} />
    </div>
  )
}
