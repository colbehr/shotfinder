import React, { useState, useRef, useCallback } from 'react'
import FilterPanel from '../components/FilterPanel';
import SearchNavbar from '../components/SearchNavbar';
import useFrameSearch from '../services/SearchService';
import SearchedContentItem from '../components/SearchedContentItem'


export default function Search() {

  const [content, setContent] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  const { frames, loading, error, hasMore } = useFrameSearch(searchTerm, pageNumber)

  const observer = useRef()
  const lastFrameElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
        console.log("Visible");
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(searchTerm) {
    setSearchTerm(searchTerm)
    setPageNumber(1)
  }

  //filter content before display
  return <>
    {/* send setSearchTerm down to the searchbar component  */}
    <SearchNavbar setSearchTerm={handleSearch} />
    <div className="container-fluid">
      <div className='row'>
        <FilterPanel />
        <div className='col-9'>
          <h3 className='mt-3'>Search: {searchTerm}</h3>
          <div className='searchedContentContainer'>
            {frames.map((item, index) => {
              if (frames.length === index + 1) {
                return <SearchedContentItem ref={lastFrameElementRef}
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  url={item.frameURL}
                  filmName={item.title} />
              } else {
                return <SearchedContentItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  url={item.frameURL}
                  filmName={item.title} />
              }

            })}
          </div>
          <div> {loading && 'Loading more...'}</div>
          <div> {error && 'Error'}</div>
        </div>
      </div>
    </div>
  </>
}