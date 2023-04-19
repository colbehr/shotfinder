import React from 'react'
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from 'swiper';
import UploadSlideContent from './UploadSlideContent';


/**
 * User can tag elements inside the specifc individual frame
 * 
 * @param {} files - list of files from step 2
 * @param {} setUpload3Content - state for content in this form step
 * @param {} setUpload3Submitted - bool for updating parent form
 * @param {String} title - styling element
 * @param {String} type  - styling element
 */
export default function UploadForm3({ files, setUpload3Content, setUpload3Submitted, title, type }) {

    // State for each image, 
    // Array of objects where arr.len == number of images
    const [frameInfo, setFrameInfo] = useState([
        { file: "", tags: "" }
    ]);

    // For each file from form part 2 (files), 
    // Create a new frame and add to frameInfo
    useEffect(() => {
        setFrameInfo([])
        files.forEach(element => {
            let newFrame = { file: element, tags: "" }
            setFrameInfo(prevState => [...prevState, newFrame])
        });
        //remove first (empty) index
        setFrameInfo(prevState => prevState.slice(0))
    }, [files]);


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
            <div className="container-fluid uploadForm3">
                <div className="row justify-content-md-center mt-5">
                    <div className="col-7">
                        <h3>{title}</h3>
                        <h5>{type}</h5>
                    </div>
                </div>
                <form onSubmit={e => { handleSubmit(e) }}>
                    <div className="row justify-content-md-center">
                        <div className="col-12" >
                            <Swiper
                                navigation={true}
                                modules={[Navigation]}
                                spaceBetween={50}>
                                {frameInfo.map((frame, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <UploadSlideContent handleFormChange={handleFormChange} frame={frame} index={index} />
                                        </SwiperSlide>
                                    )
                                })}

                            </Swiper>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-7 mb-5">
                            <button type="submit" className="btn btn-primary mt-3">Review Submission</button>
                        </div>
                    </div>
                </form>

            </div>

        </>
    )
}
