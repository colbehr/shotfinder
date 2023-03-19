import React from 'react'
import { FileUploader } from "react-drag-drop-files";

/**
 * Quick form step for the user to add images to form
 * 
 * @param {} setUpload2Content - state for content in this form step
 * @param {} setUpload2Submitted - bool for updating parent form
 * @param {} title - styling element
 * @param {} type  - styling element
 */
export default function UploadForm2({ setUpload2Content, setUpload2Submitted, title, type }) {
    const fileTypes = ["JPG", "PNG", "JPEG"];
   
    const handleChange = (files) => {
        setUpload2Content(files);
        console.log("Submit Form 2");
        setUpload2Submitted(true)
    };

    return (
        <>
            <div className="container mt-5 min-vh-100">
                <div className="row justify-content-md-center">
                    <div className="col-5">
                        <h3>{title}</h3>
                        <h5>{type}</h5>
                        <div className="text-center mt-3">
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
