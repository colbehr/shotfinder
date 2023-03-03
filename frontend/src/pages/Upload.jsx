import { useState} from 'react'
import UploadForm1 from '../components/UploadForm1';
import UploadForm2 from '../components/UploadForm2';
import UploadForm3 from '../components/UploadForm3';
import UploadNavbar from '../components/UploadNavbar';
import { postFrames } from '../services/FrameService';
export default function Upload() {
    const [upload1Content, setUpload1Content] = useState({})
    const [upload1Submitted, setupload1Submitted] = useState(false)
    const [files, setFiles] = useState([])
    function sendPostContent(data){
        setUpload1Content(data)
        setupload1Submitted(true)
        data.frameURL = "http://via.placeholder.com/130x240/"

        // postFrames(data)
    };
    
    return <>
        <UploadNavbar />
        {!upload1Submitted ? <UploadForm1 sendPostContent={sendPostContent}/> : ""}
        {upload1Submitted ? <UploadForm2  setFiles={setFiles} title={upload1Content.title} type={upload1Content.type}/> : ""}
        <UploadForm3  files={files} title={upload1Content.title} type={upload1Content.type}/>
   </>
}