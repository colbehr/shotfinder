import React, { useState, useEffect } from 'react'

import SearchedContent from '../components/SearchedContent'
import { getAllFrames } from '../services/FrameService';


export default function Search(){
    useEffect(() => {
        getAllFrames()
          .then((data) => {
            console.log(data);
            setContent(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);
    
      const [content , setContent] = useState([])

    return <>
    
        <SearchedContent content={content} />
    </>
}