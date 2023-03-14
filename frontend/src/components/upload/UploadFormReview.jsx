import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'

export default function UploadFormReview({ upload1Content, upload2Content, upload3Content }) {
    const [submissionState, setSubmissionState] = useState([]);
    const [totalFrames, setTotalFrames] = useState(0);
    const [uploadedFrames, setUploadedFrames] = useState(0);
    const [uploadFinished, setUploadFinished] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    // Format of our json object
    // {
    //     "img": img,
    //     "movieInfo": {
    //       "title": "",
    //       "year": "",
    //       "imdb": "",
    //       "type": "",
    //       "director": "",
    //       "cinematographer": "",
    //       "editor": "",
    //       "setDesigner": "",
    //       "colorist": "",
    //       "makeup": "",
    //       "wardrobe": ""
    //     },
    //     "tags": ""
    //   }


    useEffect(() => {
        //fix up json to look nice for the db and display
        //setup frame info
        let newState = []
        let numberOfFrames = 0
        upload3Content.forEach(element => {
            element["movieInfo"] = upload1Content
            element["path"] = element["file"].name
            newState.push(element)
            numberOfFrames++
        });
        setTotalFrames(numberOfFrames)
        setSubmissionState(newState)

    }, [upload1Content, upload3Content]);


    useEffect(() => {
        if (uploadedFrames === totalFrames && totalFrames > 1) {
            setUploadFinished(true)
            console.log("Finished Uploading");
        }
    }, [uploadedFrames, totalFrames]);

    //use another useEffect to log frameInfo
    // This is because useEffect runs after the render, but before React updates the DOM
    useEffect(() => {
        console.log("Update:", upload3Content);
    }, [submissionState, upload3Content]);


    const handleSubmit = event => {
        event.preventDefault();
        // disable submit button
        setDisabled(true);
        // start loader
        console.log("Submit");
        setUploadedFrames(0)
        // foreach frame
        submissionState.forEach(frame => {
            var form_data = new FormData();
            for (var key in frame) {
                if (key === "movieInfo") {
                    for (var info in frame[key]) {
                        form_data.append(info, frame[key][info]);
                    }
                } else {
                    form_data.append(key, frame[key]);
                }
            }
            // post
            axios.post('http://127.0.0.1:3001/frames', form_data, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
                console.log(res);
                setUploadedFrames(prevState => prevState + 1);

            }).catch((err) => {
                console.error(err);
            })
        });
    }

    return (
        <>
            <div className="container mt-5 min-vh-100">
                <div className="row justify-content-md-center">
                    {!uploadFinished ?
                        //if upload is finished, hide this 
                        <div className="col-5">
                            <h1>Review</h1>
                            <div className="mt-3 overflow-auto">
                                <pre>{JSON.stringify(submissionState, null, 4)}</pre>
                            </div>
                            <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar bg-warning" style={{ width: (uploadedFrames / totalFrames * 100) + "%" }}></div>
                            </div>
                            <form onSubmit={e => { handleSubmit(e) }}>
                                <button type="submit" disabled={isDisabled} className="btn btn-primary mt-3">Submit</button>
                            </form>
                        </div>
                        //show this
                        : <div className='col-12 text-center'><h2>Thanks!</h2> <Link to={"/Search" }>Back to Home</Link></div>
                    }
                </div>
            </div>
        </>
    )
}
