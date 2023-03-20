import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { getOneFrame } from '../services/FrameService';


/**
 * Page for an individual frame, showing the frame 
 * and data such as tags for the frame. 
 */
export default function Frame() {

  const [frame, setFrame] = useState({movieInfo:{}})
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const responseData = await getOneFrame(id);
      setFrame(responseData);
      document.title = "Shotfinder - "+ responseData.movieInfo.title;
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("frame", frame);
  }, [frame])
  
  return (<>
    <NavBar />
    <div className="container" style={{ minHeight: '100vh' }}>
      <div className="row mt-5">
        <div className="col-md-12">
          <h2>{frame.movieInfo.title}</h2>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-12 text-center">
          <img src={frame.frameURL} alt="Movie Frame" style={{ maxWidth: '100%', borderRadius: "10px" }} />
        </div>
      </div>
      <div className="row">
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
        <div className="col-md-6">
          <h4>Shot Info</h4>
          <ul>
            <li>Year: {frame.movieInfo.year}</li>
            <li>IMDB: <a href={"https://www.imdb.com/title/" + frame.movieInfo.imdb}>{frame.movieInfo.imdb}</a></li>
            <li>Type: {frame.movieInfo.type}</li>
            <li>ID: {frame._id}</li>
            <li>Tags: {JSON.stringify(frame.tags) }</li>
          </ul>
        </div>
      </div>
    </div>

  </>
  )
}

