import React from 'react'
import { useState, useEffect } from 'react';

export default function UploadForm3({ files, setUpload3Content, setUpload3Submitted, title, type }) {
    // state for each image, 
    // array of objects where arr.len == number of images
    const [frameInfo, setFrameInfo] = useState([
        { file: "", tags: "" }
    ]);
    
    useEffect(() => {
        setFrameInfo([])
        //setup frame info
        files.forEach(element => {
            let newFrame = { file: element, tags: "" }
            setFrameInfo(prevState => [...prevState, newFrame])
        });
        //remove first index
        setFrameInfo(prevState => prevState.slice(0))
    }, [files]);

    //use another useEffect to log frameInfo
    // This is because useEffect runs after the render, but before React updates the DOM
    useEffect(() => {
      console.log("Update:", frameInfo);
    }, [frameInfo]);

    const handleFormChange = (index, event) => {
        let data = [...frameInfo];
        data[index][event.target.name] = event.target.value;
        setFrameInfo(data);
     }

    const handleSubmit = event => {
        event.preventDefault();
        
        setUpload3Content(frameInfo)
        console.log("Submit Form 3");
        setUpload3Submitted(true)
    }

    return (
        <>
            <div className="container mt-5 min-vh-100 uploadForm3">
                <div className="row justify-content-md-center   ">
                    <div className="col-7">
                        <h3>{title}</h3>
                        <h5>{type}</h5>
                    </div>
                </div>
                <div className="row justify-content-md-center   ">
                    <div className="col-6">
                        {frameInfo.map((item, index) => {
                            return (<div key={index}>
                                <img id="target" alt={index} src={item.file ? URL.createObjectURL(item.file) : null} />
                                <label>Tags (Seperate by comma):</label>
                                <input name="tags" placeholder='Red Shirt, Grass, Cloudy, etc.' className='form-control' value={item.tags} onChange={event => handleFormChange(index, event)}></input>
                            </div>
                            )
                        })}
                    </div>
                </div>
                <div className="row justify-content-md-center   ">
                    <div className="col-7 mb-5">
                        <form onSubmit={e => { handleSubmit(e) }}>
                            <button type="submit" className="btn btn-primary mt-3">Review Submission</button>
                        </form>
                    </div>
                </div>

            </div>

        </>
    )
}
