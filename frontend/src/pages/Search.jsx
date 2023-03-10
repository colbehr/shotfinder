import React, { useState, useRef, useCallback } from 'react'
import FilterPanel from '../components/FilterPanel';
import SearchNavbar from '../components/SearchNavbar';
import useFrameSearch from '../services/SearchService';
import Split from 'react-split'
import SearchContent from '../components/SearchContent';

export default function Search() {

    const [pageNumber, setPageNumber] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const { frames, loading, error, hasMore } = useFrameSearch(searchTerm, pageNumber)

    const observer = useRef(null)
    const lastFrameElementRef = useCallback(node => {
        if (loading) return

        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
                console.log("Load more frames");
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
        <div className='container-fluid p-0'>
            <Split className='d-flex'
                sizes={[25, 75]}
                minSize={200}
                expandToMin={false}
                gutterSize={10}
                snapOffset={30}
                dragInterval={1}
                cursor="col-resize">
                <FilterPanel />
                <SearchContent frames={frames} loading={loading} error={error} lastFrameElementRef={lastFrameElementRef} />
            </Split>
        </div>

    </>
}