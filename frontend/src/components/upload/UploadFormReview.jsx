import React from 'react'
import { useEffect, useState } from 'react';
import { postFrames } from '../../services/FrameService';
/**
 * Final upload page, user can review before hitting submit
 * When submit is pressed files are posted to /frames
 * 
 * @param {} upload1Content - Movie info from form part 1 
 * @param {} upload3Content - Both files from part 2 and tags from part 3 combined (these were combined in step 2) 
 */
/*  Format of json object posted to db
   {
       "img": img,
       "movieInfo": {
         "title": "",
         "year": "",
         "imdb": "",
         "type": "",
         "director": "",
         "cinematographer": "",
         "editor": "",
         "setDesigner": "",
         "colorist": "",
         "makeup": "",
         "wardrobe": ""
       },
       "tags": ""
     }
*/

export default function UploadFormReview({ upload1Content, upload2Content, upload3Content, setUpload4Submitted }) {
    const [submissionState, setSubmissionState] = useState([]);
    const [totalFrames, setTotalFrames] = useState(0);
    const [uploadedFrames, setUploadedFrames] = useState(0);
    const [isDisabled, setDisabled] = useState(false);


    // Fix up json to look nice for the db and display
    //
    // Each frame gets a copy of the movie info (upload1Content)
    useEffect(() => {
        console.log(upload2Content);
        console.log(upload3Content);
        let newState = [];
        // Keep a count of frames to use in the upload progress bar
        let numberOfFrames = 0;

        for (let i = 0; i < Math.max(upload2Content.length, upload3Content.length); i++) {
            const frameData = upload3Content[i] || {};
            const file = upload2Content[i];

            // Combine data from upload1Content, upload2Content, upload3Content
            const frameInfo = {
                movieInfo: upload1Content,
                file: file,
                ...frameData,
            };

            newState.push(frameInfo);
            numberOfFrames++;
        }

        setTotalFrames(numberOfFrames);
        setSubmissionState(newState);
        console.log(submissionState);
    }, [upload1Content, upload2Content, upload3Content]);


    //when all frames are uploaded, update the page to display message
    useEffect(() => {
        if (uploadedFrames === totalFrames && totalFrames > 0) {
            console.log("Finished Uploading");
            setUpload4Submitted(true)
        }
    }, [uploadedFrames, totalFrames, setUpload4Submitted]);

    // //use another useEffect to log frameInfo
    // useEffect(() => {
    //     console.log("Update:", upload3Content);
    // }, [submissionState, upload3Content]);


    const handleSubmit = event => {
        event.preventDefault();
        // disable submit button
        setDisabled(true);
        // start loader
        console.log("Submit");
        setUploadedFrames(0)
        // foreach frame create form data and post to frames route
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

            // post single frame to frames route
            postFrames(form_data).then((res) => {
                setUploadedFrames(prevState => prevState + 1);
            })
        });
    }

    return (
        <>
            <div className="container mt-5 min-vh-100">
                <div className="row justify-content-md-center">
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
                </div>
            </div>
        </>
    )
}
