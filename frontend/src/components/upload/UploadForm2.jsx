import React from 'react'
import { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG"];

export default function UploadForm2({ setUpload2Content, setUpload2Submitted, title, type }) {
   
    const handleChange = (files) => {
        console.log(files);
        setUpload2Content(files);
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
