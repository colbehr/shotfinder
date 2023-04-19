import axios from "axios";
import { useEffect, useState,  } from "react";

//https://www.youtube.com/watch?v=NZKUirTtxcg
export default function useFrameSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [frames, setFrames] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [total, setTotal] = useState(0)

    //reset array when query
    useEffect(() => {
        setFrames([])
    }, [query])

    // update with new data
    useEffect(() => {
        let cancel
        setLoading(true)
        setError(false)
        axios({
            method: 'GET',
            url: "http://localhost:3001/frames/",
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
            setTotal(res.data.num_found)
        }).catch(e => {
            if(axios.isCancel(e)) return
            setError(true)
            console.log("Error : ", e)
        })
        return () => cancel()
    }, [query, pageNumber])
    return {loading, error, frames, hasMore, total}
}