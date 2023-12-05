import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { getOneFrame, patchFrames, deleteFrame, getMovieFrames } from '../services/FrameService';
import SearchContent from '../components/SearchContent';

import { PopoverPicker } from "../components/PopoverPicker";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/**
 * Page for an individual frame, showing the frame 
 * and data such as tags for the frame. 
 */
export default function Frame() {
    const [editMode, setEditMode] = useState(false)
    const [movieFrames, setMovieFrames] = useState([])
    const [frame, setFrame] = useState(
        {
            "movieInfo": {
                "title": "",
                "year": "",
                "imdb": "",
                "type": "",
            },
            "_id": "",
            "tags": [
                "",
            ],
            "frameURL": "",
            "uploadDate": "",
            "updateDate": "",
        })
    const { id } = useParams();

    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const responseData = await getOneFrame(id);
                setFrame(responseData);
                document.title = "Shotfinder - " + responseData.movieInfo.title;
            } catch (error) {
                setError(true)
            }
        }
        fetchData();
    }, [id]);

    //once we have a frame, get alternate frames for suggestions
    useEffect(() => {
        async function fetchData() {
            if (!error) {
                const responseData = await getMovieFrames(frame.movieInfo.title, frame._id);
                setMovieFrames(responseData);
            }
        }
        fetchData();
    }, [frame, error])

    const handleSubmit = event => {
        event.preventDefault();
        console.log("Submit", frame);
        patchFrames(frame)
    }

    const handleDelete = async event => {
        event.preventDefault();
        console.log("Delete", frame);
        try {
            await deleteFrame(frame)
            // this runs after deleteFrame is done
            redirect()
        } catch (error) {
            // this runs if deleteFrame throws an error
            console.error(error)
        }
    }

    const redirect = () => {
        window.location.replace('/search');
    }
    return (<>
        <NavBar />
        <div className="container" style={{ minHeight: '100vh' }}>
            {error === false ?
                <>
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <h2>{frame.movieInfo.title}</h2>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-12 text-center mb-2">
                            <img src={"http://localhost:3001" + frame.frameURL} alt="Movie Frame" style={{ maxWidth: '100%', borderRadius: "10px" }} />
                        </div>
                        <div className="col-md-12 text-end">

                            {editMode ?
                                <button className='btn btn-success' onClick={(e) => { setEditMode(false); handleSubmit(e) }}>Save</button> :
                                <button className='btn btn-dark' onClick={(e) => { setEditMode(true) }}>Edit</button>
                            }

                            {editMode ?
                                <button className='btn btn-danger ms-3' onClick={handleShow}>Delete</button> :
                                ""
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
                                    {typeof frame.frameInfo != "undefined" ? (
                                        <>
                                            <li>Palette:
                                                <div className='d-flex my-2'>
                                                    <PopoverPicker color={frame.frameInfo.palette.split(",")[0]} />
                                                    <PopoverPicker color={frame.frameInfo.palette.split(",")[1]} />
                                                    <PopoverPicker color={frame.frameInfo.palette.split(",")[2]} />
                                                </div>
                                            </li>
                                            <li>Lighting Type: {frame.frameInfo.lightingType}</li>
                                            <li>Location Type: {frame.frameInfo.locationType}</li>
                                        </>
                                    ) : " "}
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
                                {typeof frame.frameInfo != "undefined" ?
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="imdb" className="form-label">Lighting Type</label>
                                            <input type="text" className="form-control form-control-sm"
                                                defaultValue={frame.frameInfo.lightingType}
                                                name="lighting"
                                                onChange={(e) => { let newFrame = frame; newFrame.frameInfo.lightingType = e.target.value; setFrame(newFrame) }} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="imdb" className="form-label">Location Type</label>
                                            <input type="text" className="form-control form-control-sm"
                                                defaultValue={frame.frameInfo.locationType}
                                                name="location"
                                                onChange={(e) => { let newFrame = frame; newFrame.frameInfo.locationType = e.target.value; setFrame(newFrame) }} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="type" className="form-label">Tags</label>
                                            <textarea className="form-control" id="" rows="3" defaultValue={frame.tags}
                                                onChange={(e) => { let newFrame = frame; newFrame.tags = e.target.value.split(","); setFrame(newFrame) }} >
                                            </textarea>
                                        </div>
                                    </>
                                    :
                                    <></>}
                            </div>
                        }
                    </div>

                    <div className="row mt-5">
                        <h4>More Frames from {frame.movieInfo.title}</h4>
                    </div>
                    <div className="row">
                        <SearchContent frames={movieFrames.sort(() => Math.random() - 0.5)} />
                    </div>
                </>
                :
                <>
                    <div className='position-absolute top-50 start-50 translate-middle text-center'>
                        <p>Couldn't find that frame. 😓</p>
                        <NavLink to="/search" className='btn btn-secondary'>
                            Home
                        </NavLink>
                    </div>
                </>}
        </div>
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete this?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Deleting this frame is permanent and cannot be undone.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <button className='btn btn-danger' onClick={(e) => { handleClose(); setEditMode(false); handleDelete(e); }}>Delete</button>
            </Modal.Footer>
        </Modal>

    </>
    )
}

