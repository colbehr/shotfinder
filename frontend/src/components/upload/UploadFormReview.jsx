import React from 'react'

export default function UploadFormReview({upload1Content, upload2Content, upload3Content}) {
    console.log(upload1Content);
    console.log(upload2Content);
    console.log(upload3Content);

    const handleSubmit = event => {
        event.preventDefault();

        // upload to server and post to api
    }
    return (
        <>
            <div className="container mt-5 min-vh-100">
                <div className="row justify-content-md-center">
                    <div className="col-5">
                        <h1>Review</h1>
                        <div className="text-center mt-3">
                            {JSON.stringify(upload1Content)}
                            {JSON.stringify(upload2Content)}
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
