import React, { useState, useRef, useEffect, useCallback } from 'react'
// import FilterPanel from '../components/FilterPanel';
import SearchBar from '../components/SearchBarNavbarMid';
import useFrameSearch from '../services/SearchService';
// import Split from 'react-split'
import SearchContent from '../components/SearchContent';
import NavBar from '../components/Navbar';


/**
 * Shows a search bar and frames from the searched 
 * term or some random files from the db
 */
export default function Search() {

    const [pageNumber, setPageNumber] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const { frames, loading, error, hasMore, total} = useFrameSearch(searchTerm, pageNumber)

    const observer = useRef(null)
    const lastFrameElementRef = useCallback(node => {
        if (loading) return

        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        document.title = "Shotfinder";
    }, [])
    
    function handleSearch(searchTerm) {
        setSearchTerm(searchTerm)
        setPageNumber(1)
    }

    //filter content before display
    return <>
        {/* send setSearchTerm down to the searchbar component  */}
        <NavBar AdditionalComponent={<SearchBar setSearchTerm={handleSearch} />} />
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 mt-3">
                    <p className='mb-0 text-secondary' style={{textAlign:"right", paddingRight:"15px"}}>Showing {frames.length} Frames of {total }</p>
                </div>
            </div>
        </div>
        <div className='container-fluid p-0'>
            {/* <Split className='d-flex' */}
                {/* sizes={[25, 75]}
                minSize={200}
                expandToMin={false}
                gutterSize={10}
                snapOffset={30}
                dragInterval={1}
                cursor="col-resize"> */}
                {/* <FilterPanel /> */}
                <SearchContent frames={frames} loading={loading} error={error} lastFrameElementRef={lastFrameElementRef} />
            {/* </Split> */}
        </div>

    </>
}