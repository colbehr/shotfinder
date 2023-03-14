import React from 'react'
import { useState, useEffect } from 'react';

export default function UploadForm1({ setUpload1Content, setUpload1Submitted }) {

    const handleSubmit = event => {
        event.preventDefault();
        let obj = {
            "title": title, 
            "year": year, 
            "imdb": imdb, 
            "type": type, 
            "director": director,
            "cinematographer": cinematographer,
            "editor": editor,
            "setDesigner": setDesigner,
            "colorist": colorist,
            "makeup": makeup,
            "wardrobe": wardrobe}
        console.log(obj);
        setUpload1Content(obj)
        console.log("Submit Form 1");
        setUpload1Submitted(true)
    }

    const [title, setTitle] = useState("");
    const [year, setYear] = useState();
    const [imdb, setImdb] = useState("");
    const [type, setType] = useState("");

    const [director, setDirector] = useState("");
    const [cinematographer, setCinematographer] = useState("");
    const [editor, setEditor] = useState("");
    const [setDesigner, setSetDesigner] = useState("");
    const [colorist, setColorist] = useState("");
    const [makeup, setMakeup] = useState("");
    const [wardrobe, setWardrobe] = useState("");


    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-md-center">
                    <div className='col-6'>
                        <h3>Upload Frames</h3>

                        <p>This form guides you through the process of uploading and tagging frames with unique data. It starts by collecting data about the film, then lets you upload the frames, and finally allows you to tag each frame with customized information.</p>
                        <form onSubmit={e => {handleSubmit(e)}}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" placeholder='Pulp Fiction' required value={title} onChange={e => setTitle(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="year" className="form-label">Year</label>
                                <input type="number" className="form-control" id="year" defaultValue={new Date().getFullYear()} required onChange={e => setYear(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="imdbID" className="form-label">IMDB Link or ID</label>
                                <input type="text" className="form-control" id="imdbID" placeholder='tt0110912' value={imdb} onChange={e => setImdb(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">Film Type</label>
                                <select className="form-select" aria-label="Film Type" id="Type" required defaultValue={""} onChange={e => setType(e.target.value)}>
                                    <option value="" disabled="disabled">What type of content?</option>
                                    <option value="Movie">Movie</option>
                                    <option value="TV Show">TV Show</option>
                                    <option value="Music Video">Music Video</option>
                                    <option value="Short Film">Short Film</option>
                                    <option value="Commercial">Commercial</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-info-circle " viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                    &nbsp;  Try to fill out as many of these names as available, we'll try to find as many as we can from other sources.
                                </p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="director" className="form-label">Director</label>
                                <input type="text" className="form-control" id="director" value={director} onChange={e => setDirector(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cinematographer" className="form-label">Cinematographer</label>
                                <input type="text" className="form-control" id="cinematographer" value={cinematographer} onChange={e => setCinematographer(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editor" className="form-label">Editor</label>
                                <input type="text" className="form-control" id="editor" value={editor} onChange={e => setEditor(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="setDesigner" className="form-label">Set Designer</label>
                                <input type="text" className="form-control" id="setDesigner" value={setDesigner} onChange={e => setSetDesigner(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="colorist" className="form-label">Colorist</label>
                                <input type="text" className="form-control" id="colorist" value={colorist} onChange={e => setColorist(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="makeup" className="form-label">Makeup</label>
                                <input type="text" className="form-control" id="makeup" value={makeup} onChange={e => setMakeup(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="wardrobe" className="form-label">Wardrobe</label>
                                <input type="text" className="form-control" id="wardrobe" value={wardrobe} onChange={e => setWardrobe(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary mb-5">Next</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
