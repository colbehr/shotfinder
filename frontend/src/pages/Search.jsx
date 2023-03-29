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
    const [scale, setScale] = useState(1)
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
                <div className="col-12 mt-3 d-flex" style={{textAlign:"right", paddingRight:"30px"}}>
                    <p className='mb-0 text-secondary me-auto ms-2 mt-1'>Showing {frames.length} of {total} frames</p>
                    <div>
                        <input type="radio" className="btn-check" name="scale" id="small" defaultChecked  onChange={(e)=>(setScale(1))}/>
                        <label className="btn btn-dark me-2" htmlFor="small">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-3x3-gap-fill" viewBox="0 0 16 16">
                            <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"/>
                            </svg>
                        </label>

                        <input type="radio" className="btn-check" name="scale" id="med"  onChange={(e)=>(setScale(2))}/>
                        <label className="btn btn-dark me-2" htmlFor="med">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-fill" viewBox="0 0 16 16">
                            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                            </svg>
                        </label>

                        <input type="radio" className="btn-check" name="scale" id="large"  onChange={(e)=>(setScale(3))}/>
                        <label className="btn btn-dark" htmlFor="large">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square-fill" viewBox="0 0 16 16">
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                            </svg>
                        </label>
                    </div>
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
                <SearchContent frames={frames} loading={loading} error={error} lastFrameElementRef={lastFrameElementRef} scale={scale}/>
            {/* </Split> */}
        </div>

    </>
}