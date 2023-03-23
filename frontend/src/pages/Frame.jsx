import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { getOneFrame, patchFrames } from '../services/FrameService';


/**
 * Page for an individual frame, showing the frame 
 * and data such as tags for the frame. 
 */
export default function Frame() {
    const [editMode, setEditMode] = useState(false)
    const [frame, setFrame] = useState({ movieInfo: {} })
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const responseData = await getOneFrame(id);
            setFrame(responseData);
            document.title = "Shotfinder - " + responseData.movieInfo.title;
        }
        fetchData();
    }, [id]);

    const handleSubmit = event => {
        event.preventDefault();
        console.log("Submit");
        patchFrames(frame)
    }

    return (<>
        <NavBar />
        <div className="container" style={{ minHeight: '100vh' }}>
            <div className="row mt-5">
                <div className="col-md-12">
                    <h2>{frame.movieInfo.title}</h2>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-12 text-center mb-2">
                    <img src={frame.frameURL} alt="Movie Frame" style={{ maxWidth: '100%', borderRadius: "10px" }} />
                </div>
                <div className="col-md-12 text-end">
                    {editMode ?
                        <button className='btn btn-danger' onClick={(e) => { setEditMode(false); handleSubmit(e) }}>Save</button> :
                        <button className='btn btn-dark' onClick={(e) => { setEditMode(true) }}>Edit</button>
                    }
                </div>
            </div>
            <div className="row">
                {editMode === false ?
                    <div className="col-md-6">
                        <h4>Crew</h4>
                        <ul>
                            <li>Director: {frame.movieInfo.director}</li>
                            <li>Cinematographer: {frame.movieInfo.cinematographer}</li>
                            <li>Editor: {frame.movieInfo.editor}</li>
                            <li>Set Designer: {frame.movieInfo.setDesigner}</li>
                            <li>Colorist: {frame.movieInfo.colorist}</li>
                            <li>Makeup: {frame.movieInfo.makeup}</li>
                            <li>Wardrobe: {frame.movieInfo.wardrobe}</li>
                        </ul>
                    </div>
                    :
                    <div className="col-md-6 mb-5">
                        <h4>Crew</h4>
                        <div className="mb-3">
                            <label htmlFor="director" className="form-label">Director</label>
                            <input type="text" className="form-control form-control-sm"
                                defaultValue={frame.movieInfo.director}
                                name="director"
                                onChange={(e) => { let newFrame = frame; newFrame.movieInfo.director = e.target.value; setFrame(newFrame) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cinematographer" className="form-label">Cinematographer</label>
                            <input type="text" className="form-control form-control-sm"
                                defaultValue={frame.movieInfo.cinematographer}
                                name="cinematographer"
                                onChange={(e) => { let newFrame = frame; newFrame.movieInfo.cinematographer = e.target.value; setFrame(newFrame) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editor" className="form-label">Editor</label>
                            <input type="text" className="form-control form-control-sm"
                                defaultValue={frame.movieInfo.editor}
                                name="editor"
                                onChange={(e) => { let newFrame = frame; newFrame.movieInfo.editor = e.target.value; setFrame(newFrame) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="setDesigner" className="form-label">Set Designer</label>
                            <input type="text" className="form-control form-control-sm"
                                defaultValue={frame.movieInfo.setDesigner}
                                name="setDesigner"
                                onChange={(e) => { let newFrame = frame; newFrame.movieInfo.setDesigner = e.target.value; setFrame(newFrame) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="colorist" className="form-label">Colorist</label>
                            <input type="text" className="form-control form-control-sm"
                                defaultValue={frame.movieInfo.colorist}
                                name="colorist"
                                onChange={(e) => { let newFrame = frame; newFrame.movieInfo.colorist = e.target.value; setFrame(newFrame) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="makeup" className="form-label">Makeup</label>
                            <input type="text" className="form-control form-control-sm"
                                defaultValue={frame.movieInfo.makeup}
                                name="makeup"
                                onChange={(e) => { let newFrame = frame; newFrame.movieInfo.makeup = e.target.value; setFrame(newFrame) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="wardrobe" className="form-label">Wardrobe</label>
                            <input type="text" className="form-control form-control-sm"
                                defaultValue={frame.movieInfo.wardrobe}
                                name="wardrobe"
                                onChange={(e) => { let newFrame = frame; newFrame.movieInfo.wardrobe = e.target.value; setFrame(newFrame) }} />
                        </div>
                    </div>
                }

                {editMode === false ?
                    <div className="col-md-6">
                        <h4>Shot Info</h4>
                        <ul>
                            <li>Year: {frame.movieInfo.year}</li>
                            <li>IMDB: <a href={"https://www.imdb.com/title/" + frame.movieInfo.imdb}>{frame.movieInfo.imdb}</a></li>
                            <li>Type: {frame.movieInfo.type}</li>
                            <li>ID: {frame._id}</li>
                            <li>Tags: {JSON.stringify(frame.tags)}</li>
                        </ul>
                    </div>
                    :
                    <div className="col-md-6">
                        <h4>Shot Info</h4>
                        <div className="mb-3">
                            <label htmlFor="year" className="form-label">Year</label>
                            <input type="number" className="form-control form-control-sm"
                                defaultValue={frame.movieInfo.year}
                                name="year"
                                onChange={(e) => { let newFrame = frame; newFrame.movieInfo.year = e.target.value; setFrame(newFrame) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="imdb" className="form-label">IMDB ID</label>
                            <input type="text" className="form-control form-control-sm"
                                defaultValue={frame.movieInfo.imdb}
                                name="imdb"
                                onChange={(e) => { let newFrame = frame; newFrame.movieInfo.imdb = e.target.value; setFrame(newFrame) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">Type</label>
                            <select className="form-select form-select-sm" aria-label="Film Type" name="type" defaultValue={frame.movieInfo.type} onChange={(e) => { let newFrame = frame; newFrame.movieInfo.type = e.target.value; setFrame(newFrame) }}>
                                <option value="" disabled="disabled">What type of content?</option>
                                <option value="Movie">Movie</option>
                                <option value="TV Show">TV Show</option>
                                <option value="Music Video">Music Video</option>
                                <option value="Short Film">Short Film</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                        </div>
                    </div>
                }
            </div>
        </div>

    </>
    )
}

