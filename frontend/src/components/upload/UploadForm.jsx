import React from 'react'
import { useState, useEffect } from 'react'
import UploadForm1 from './UploadForm1'
import UploadForm2 from './UploadForm2'
import UploadForm3 from './UploadForm3'
import UploadFormReview from './UploadFormReview'

export default function UploadForm({setStep}) {
    const [upload1Content, setUpload1Content] = useState({})
    const [upload1Submitted, setUpload1Submitted] = useState(false)
    const [upload2Content, setUpload2Content] = useState({})
    const [upload2Submitted, setUpload2Submitted] = useState(false)
    const [upload3Content, setUpload3Content] = useState({})
    const [upload3Submitted, setUpload3Submitted] = useState(false)
    
    useEffect(() => {
      console.log("newStep");
      setStep((upload1Submitted? 1 : 0) + (upload2Submitted? 1 : 0) + (upload3Submitted? 1 : 0) + 1)
    }, [upload1Submitted,upload2Submitted,upload3Submitted])
    

  return (
    <>
    
        {!upload1Submitted ? <UploadForm1 setUpload1Content={setUpload1Content} setUpload1Submitted={setUpload1Submitted}/> : ""}
        {upload1Submitted && !upload2Submitted ? <UploadForm2  setUpload2Content={setUpload2Content} setUpload2Submitted={setUpload2Submitted} title={upload1Content.title} type={upload1Content.type}/> : ""}
        {upload2Submitted && !upload3Submitted ? <UploadForm3  setUpload3Content={setUpload3Content} setUpload3Submitted={setUpload3Submitted} title={upload1Content.title} type={upload1Content.type} files={Array.from(upload2Content || [])} /> : ""}
        { upload3Submitted ? <UploadFormReview upload1Content={upload1Content} upload2Content={upload2Content} upload3Content={upload3Content}/> : ""}
        
    </>
  )
}
