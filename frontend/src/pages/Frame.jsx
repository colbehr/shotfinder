import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchNavbar from '../components/SearchNavbar';
import { getOneFrame } from '../services/FrameService';
export default function Frame() {

  const [frame, setFrame] = useState({})
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const responseData = await getOneFrame(id);
      setFrame(responseData);
    }
    fetchData();
  }, [id]);

  return (<>
    <SearchNavbar />
    <div className="container" style={{ minHeight: '100vh' }}>
      <div className="row mt-5">
        <div className="col-md-12">
          <h2>{frame.title}</h2>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-12 text-center">
          <img src={frame.frameURL} alt="Movie Frame" style={{ maxWidth: '100%' }} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h4>Crew</h4>
          <ul>
            <li>Director: {frame.director}</li>
            <li>Cinematographer: {frame.cinematographer}</li>
            <li>Editor: {frame.editor}</li>
            <li>Set Designer: {frame.setDesigner}</li>
            <li>Production Company: {frame.productionCompany}</li>
            <li>Colorist: {frame.colorist}</li>
            <li>Makeup: {frame.makeup}</li>
            <li>Wardrobe: {frame.wardrobe}</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h4>Shot Info</h4>
          <ul>
            <li>Year: {frame.year}</li>
            <li>IMDb: {frame.imdb}</li>
            <li>Type: {frame.type}</li>
            <li>ID: {frame.id}</li>
          </ul>
        </div>
      </div>
    </div>

  </>
  )
}

