import React from 'react'
import { useState, useEffect } from 'react';

import { Swiper,  SwiperSlide } from "swiper/react";
import { Navigation} from 'swiper';

// configure Swiper to use modules

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Swiper.use([Navigation]);

// import required modules
// Swiper.use([Navigation]);


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
        //remove first index
        setFrameInfo(prevState => prevState.slice(0))
    }, [files]);

    // use another useEffect to log frameInfo
    // useEffect(() => {
    //   console.log("Update:", frameInfo);
    // }, [frameInfo]);

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
                    <div className="col-12">
                        <Swiper 
                            navigation={true} 
                            modules={[Navigation]} 
                            onSlideChange={() => console.log('slide change')} 
                            spaceBetween={50}>
                            {frameInfo.map((item, index) => {
                                return (
                                <SwiperSlide key={index}>
                                    <div>
                                        <img id="target" alt={index} src={item.file ? URL.createObjectURL(item.file) : null} />
                                        <label>Tags (Seperate by comma):</label>
                                        <input name="tags" placeholder='Red Shirt, Grass, Cloudy, etc.' className='form-control' required value={item.tags} onChange={event => handleFormChange(index, event)}></input>
                                    </div>
                                </SwiperSlide>
                                )
                            })}

                        </Swiper>
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
