import axios from "axios";
import { useEffect, useState,  } from "react";

//https://www.youtube.com/watch?v=NZKUirTtxcg
export default function useFrameSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [frames, setFrames] = useState([])
    const [hasMore, setHasMore] = useState(false)

    //reset array when query
    useEffect(() => {
        setFrames([])
    }, [query])

    useEffect(() => {
        let cancel
        setLoading(true)
        setError(false)
        axios({
            method: 'GET',
            url: "/frames/find",
            params: {
                search: query,
                page: pageNumber,
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setFrames(prevFrames => {
                return [...new Set([...prevFrames, ...res.data.frames])]
            })
            setHasMore(res.data.frames.length > 0)
            setLoading(false)
        }).catch(e => {
            if(axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [query, pageNumber])
    return {loading, error, frames, hasMore}
}