import React, { useState, useEffect } from 'react'
import FilterPanel from '../components/FilterPanel';
import SearchNavbar from '../components/SearchNavbar';

import SearchedContent from '../components/SearchedContent'
import { getAllFrames } from '../services/FrameService';


export default function Search() {
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

  const [content, setContent] = useState([])
  const [searchTerm, setSearchTerm] = useState("test")
  //filter content before display
  return <>
    {/* send setSearchTerm down to the searchbar component  */}
    <SearchNavbar setSearchTerm={setSearchTerm} />
    <div className='row'>
      <div className='col-3'>
        <FilterPanel />
      </div>
      <div className='col-9'>
        <h3 className='mt-3'>Search: {searchTerm}</h3>
        <SearchedContent content={content} />
      </div>
    </div>
  </>
}