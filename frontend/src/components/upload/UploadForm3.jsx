import React from 'react'

export default function UploadForm3({ files, setUpload3Content, setUpload3Submitted, title, type }) {
    // state for each image, 
    // array of objects where arr.len == number of images
    
    const handleSubmit = event => {
        event.preventDefault();
        console.log("submit 3");
        setUpload3Content({})
        setUpload3Submitted(true)
    }

    files = Array.from(files || []);

    return (
        <>
            <div className="container mt-5 min-vh-100 uploadForm3">
                <div className="row justify-content-md-center   ">
                    <div className="col-7 mb-5">
                        <h3>{title}</h3>
                        <h5>{type}</h5>
                        <div className="text-center mt-3">
                            {files.map((item, index) => {
                                return <img id="target" alt='' src={item ? URL.createObjectURL(item) : null}/>
                            })}
                        </div>
                        <form onSubmit={e => {handleSubmit(e)}}>
                            <button type="submit" className="btn btn-primary mt-3">Review Submission</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
