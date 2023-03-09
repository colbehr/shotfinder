import React from 'react'
import { useEffect } from 'react';

export default function UploadFormReview({upload1Content, upload2Content, upload3Content}) {
    useEffect(() => {
        //fix up json to look nice for the db and display
    }, []);
    const handleSubmit = event => {
        event.preventDefault();
        console.log("Submit");
        // upload to server 
        // find url, add to json and post to api
    }
    return (
        <>
            <div className="container mt-5 min-vh-100">
                <div className="row justify-content-md-center">
                    <div className="col-5">
                        <h1>Review</h1>
                        <div className="text-center mt-3 overflow-auto">
                            {JSON.stringify(upload1Content)}
                            <br></br>
                            <br></br>
                            {JSON.stringify(upload2Content)}
                            <br></br>
                            <br></br>
                            {JSON.stringify(upload3Content)}
                        </div>
                        <form onSubmit={e => {handleSubmit(e)}}>
                            <button type="submit" className="btn btn-primary mt-3">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
