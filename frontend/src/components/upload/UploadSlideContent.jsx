import { useState, useEffect, createRef } from "react";
import React from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { PopoverPicker } from "../PopoverPicker";
import ColorThief from "colorthief";

export default function UploadSlideContent({ handleFormChange, frame, index }) {

    const [palette, setPalette] = useState(["#000", "#000", "#000"]);
    const [shotType, setShotType] = useState("");
    const [lightingType, setLightingType] = useState([]);
    const [locationType, setLocationType] = useState("");
    const [timeOfDay, setTimeOfDay] = useState(2);
    const [numberOfPeople, setNumberOfPeople] = useState(2);
    const [timePeriod, setTimePeriod] = useState("");
    const [tags, setTags] = useState([]);

    // useEffect to watch for changes in relevant states and call handleFormChange
    useEffect(() => {
        handleFormChange(index, {
            palette,
            shotType,
            lightingType,
            locationType,
            timeOfDay,
            numberOfPeople,
            timePeriod,
            tags,
        });
        // eslint-disable-next-line
    }, [palette, shotType, lightingType, locationType, timeOfDay, numberOfPeople, timePeriod, tags, index]);


    const imgRef = createRef();

    const shotTypeOptions = [
        { value: "Extreme Close-up", label: "Extreme Close-up" },
        { value: "Close-up", label: "Close-up" },
        { value: "Medium Close-up", label: "Medium Close-up" },
        { value: "Medium", label: "Medium" },
        { value: "Medium Wide", label: "Medium Wide" },
        { value: "Wide", label: "Wide" },
        { value: "Extreme Wide", label: "Extreme Wide" },
    ]

    let lightingTypeOptions = [
        { value: "Soft Light", label: "Soft Light" },
        { value: "Hard Light", label: "Hard Light" },
        { value: "High Contrast", label: "High Contrast" },
        { value: "Low Contrast", label: "Low Contrast" },
        { value: "Backlight", label: "Back Light" },
        { value: "Top Light", label: "Top Light" },
        { value: "Under Light", label: "Under Light" },
        { value: "Side Light", label: "Side Light" },
        { value: "Edge Light", label: "Edge Light" },
        { value: "Silhouette", label: "Silhouette" },
    ]

    let TODOptions = [
        { value: 'Twilight', label: 'Twilight' },
        { value: 'Sunrise', label: 'Sunrise' },
        { value: 'Mid Day', label: 'Mid Day' },
        { value: 'Golden Hour', label: 'Golden Hour' },
        { value: 'Magic Hour', label: 'Magic Hour' },
        { value: 'Blue Hour', label: 'Blue Hour' },
        { value: 'Night', label: 'Night' }
    ]

    let peopleNumberOptions = [
        0, 1, 2, 3, 4, 5, "5+"
    ]

    let timePeriodOptions = [
        { value: 'Prehistoric', label: 'Prehistoric' },
        { value: 'Classical', label: 'Classical' },
        { value: 'Victorian', label: 'Victorian' },
        { value: '1920s', label: '1920s' },
        { value: '1930s', label: '1930s' },
        { value: '1940s', label: '1940s' },
        { value: '1950s', label: '1950s' },
        { value: '1960s', label: '1960s' },
        { value: '1970s', label: '1970s' },
        { value: '1980s', label: '1980s' },
        { value: '1990s', label: '1990s' },
        { value: '2000s', label: '2000s' },
        { value: '2010s', label: '2010s' },
        { value: 'Modern', label: 'Modern' },
        { value: 'Future', label: 'Future' },
        { value: 'Other', label: 'Other' }
    ]

    const style = {
        control: base => ({
            ...base,
            border: 0,
            // This line disables the blue border
            boxShadow: 'none'

        })
    };

    const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')
    return (
        <div className='container mt-5'>
            <div className="row justify-content-center">
                <div className='col-md-4 col-sm-12 order-md-1 order-sm-2 mt-3'>
                    <div className="row justify-content-between">
                        <label htmlFor="color" className="col-sm-2 col-form-label ">Color</label>
                        <div className="col-5 text-end">
                            <div className="d-flex justify-content-end">
                                <PopoverPicker color={palette[0]} onChange={(e) => { setPalette([e, palette[1], palette[2]]) }} />
                                <PopoverPicker color={palette[1]} onChange={(e) => { setPalette([palette[0], e, palette[2]]) }} />
                                <PopoverPicker color={palette[2]} onChange={(e) => { setPalette([palette[0], palette[1], e]) }} />
                            </div>
                        </div>
                    </div>

                    <label htmlFor="">Shot Type</label>
                    <Select
                        placeholder={'Close Up, Long Shot'}
                        menuPortalTarget={document.body}
                        options={shotTypeOptions}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        onChange={(selectedOption) => setShotType(selectedOption.value)}
                    />

                    <label htmlFor="" className="mt-2">Lighting Type</label>
                    <Select
                        isMulti
                        placeholder={'High Key, Low Key'}
                        menuPortalTarget={document.body}
                        options={lightingTypeOptions}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        onChange={(selectedOptions) => setLightingType(selectedOptions.map(option => option.value))}
                    />

                    <label htmlFor="" className='mt-2'>Interior/Exterior</label><br></br>
                    <div className="btn-group mb-2" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name={"intExt" + index} id={"int" + index} onChange={() => setLocationType("Interior")} />
                        <label className="btn btn-outline-primary" htmlFor={"int" + index}>Interior</label>

                        <input type="radio" className="btn-check" name={"intExt" + index} id={"ext" + index} onChange={() => setLocationType("Exterior")} />
                        <label className="btn btn-outline-primary" htmlFor={"ext" + index}>Exterior</label>
                    </div><br></br>

                    <label htmlFor="customRange2" className='mt-2'>Time of Day: {TODOptions[timeOfDay].value}</label>
                    <input type="range" className="form-range" min="0" max={TODOptions.length - 1} defaultValue={2} onChange={(e) => setTimeOfDay(e.target.value)} id="customRange2"></input>

                    <label htmlFor="" className='mt-2'>Number of People: {[peopleNumberOptions[numberOfPeople]]}</label>
                    <input type="range" className="form-range mb-0" min="0" max={peopleNumberOptions.length - 1} defaultValue={2} onChange={(e) => setNumberOfPeople(e.target.value)} id="customRange2"></input>

                    <label htmlFor="" className="mt-2">Time Period</label>
                    <Select
                        placeholder={'Select a Time Period'}
                        options={timePeriodOptions}
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        onChange={(selectedOption) => setTimePeriod(selectedOption.value)}
                    />
                </div>
                <div className='col-md-8 col-sm-12  order-md-2 order-sm-1'>
                    <img
                        crossOrigin={"anonymous"}
                        ref={imgRef}
                        src={frame.file ? URL.createObjectURL(frame.file) : null}
                        alt={index}
                        onLoad={() => {
                            if (palette[0] === "#000") {
                                const colorThief = new ColorThief();
                                const img = imgRef.current;
                                let result = colorThief.getPalette(img, 3);
                                result = result.map(rgb => rgbToHex(rgb[0], rgb[1], rgb[2]));
                                console.log(JSON.stringify(result));
                                setPalette(result)
                            }
                        }}
                    />
                    <label>Tags</label>
                    {/* <input name="tags" placeholder='Red Shirt, Grass, Cloudy, etc.' className='form-control mb-2' required defaultValue={frame.tags} onChange={event => handleFormChange(index, event)}></input> */}

                    <CreatableSelect
                        isMulti
                        required
                        className="selectNav basic-multi-select"
                        classNamePrefix="select"
                        isClearable={false}
                        placeholder={'Grass, Close Up, Day'}
                        onChange={(selectedOptions) => setTags(selectedOptions.map(option => option.value))}
                        styles={style}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary25: '#ADB5B8',
                                primary: 'black',
                            }
                        })}
                    />

                </div>
            </div>


            <hr className="border border-secondary border-2 my-5" />

        </div>
    )
}