import React from 'react'
import { Link } from 'react-router-dom'

export default function UploadFormComplete() {
    return (<>
        <div className='col-12 text-center mt-5'>
            <h2>Thanks!</h2> 
            <Link to={"/search"}>Back to Home</Link>
        </div>
    </>)
}
