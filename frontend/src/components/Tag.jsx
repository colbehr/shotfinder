import React from 'react'

const handleClick = (event, tag) => {
    event.preventDefault();
    console.log("Tag: ", tag);
}

export default function Tag({tag, index}) {
  return (<div key={index}>
            <p onClick={e => {handleClick(e, tag)}}>{tag[0].toUpperCase() + tag.substring(1)} </p>
        </div>
  )
}
