import React from 'react'

export default function UploadSlideContent({ handleFormChange, frame, index }) {


    let shotTypeOptions = [
        "Medium Shot",
        "Long Shot",
        "Closeup Shot",
        "Medium Shot",
    ]

    let lightingTypeOptions = [
        "Low Key",
        "High Key",
    ]
    let TODOptions = [
        "Sunrise",
        "Mid Day",
        "Golden Hour",
        "Magic Hour",
        "Blue Hour",
        "Night",
    ]

    let timePeriodOptions = [
        "Caveman",
        "Vintage",
        "Modern",
        "Future",
    ]

  
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className='col-md-4 col-sm-12 order-md-1 order-sm-2'>
                    <label htmlFor="">Shot Type</label>
                    <select className="form-select form-select-sm my-2" aria-label="Shot Type">
                        <option disabled selected>Select a Shot Type </option>
                        {shotTypeOptions.map((item, index) => (
                            <option value={item.toLowerCase()}>{item}</option>
                        ))}
                    </select>
                    <label htmlFor="">Lighting Type</label>
                    <select className="form-select form-select-sm my-2" aria-label="Shot Type">
                        <option disabled selected>Select a Lighting Type </option>
                        {lightingTypeOptions.map((item, index) => (
                            <option value={item.toLowerCase()}>{item}</option>
                        ))}
                    </select>
                    <label htmlFor="">Interior/Exterior</label><br></br>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name={"intExt"+index} id={"int"+index} autocomplete="off" />
                        <label className="btn btn-outline-primary" for={"int"+index}>Interior</label>

                        <input type="radio" className="btn-check" name={"intExt"+index} id={"ext"+index} autocomplete="off" />
                        <label className="btn btn-outline-primary" for={"ext"+index}>Exterior</label>
                    </div><br></br>
                    <label htmlFor="">Time of Day</label>
                    <select className="form-select form-select-sm my-2" aria-label="Shot Type">
                        <option disabled selected>Select a Time of Day</option>
                        {TODOptions.map((item, index) => (
                            <option value={item.toLowerCase()}>{item}</option>
                        ))}
                    </select>
                    <label htmlFor="">Number of People</label>
                    <input type="number" min="0" max="10" className='form-control form-control-sm' name="" id="" defaultValue={2} />
                    <label htmlFor="">Time Period</label>
                    <select className="form-select form-select-sm my-2" aria-label="Shot Type">
                        <option disabled selected>Select a Time Period </option>
                        {timePeriodOptions.map((item, index) => (
                            <option value={item.toLowerCase()}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className='col-md-8 col-sm-12  order-md-2 order-sm-1'>
                    <img
                        crossOrigin={"anonymous"}
                        src={frame.file ? URL.createObjectURL(frame.file) : null}
                        alt={index} />
                    <label>Tags (Seperate by comma):</label>
                    <input name="tags" placeholder='Red Shirt, Grass, Cloudy, etc.' className='form-control' required defaultValue={frame.tags} onChange={event => handleFormChange(index, event)}></input>
                </div>
            </div>
        </div>
    )
}
