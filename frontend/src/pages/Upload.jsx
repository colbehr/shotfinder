import { useState} from 'react'
import UploadForm1 from '../components/UploadForm1';
import UploadNavbar from '../components/UploadNavbar';
import { postFrames } from '../services/FrameService';
export default function Upload() {
    const [upload1Content, setUpload1Content] = useState({})
    function sendPostContent(data){
        setUpload1Content(data)
        data.frameURL = "http://via.placeholder.com/130x240/"

        postFrames(data)
    };
    
    return <>
        <UploadNavbar />
        <UploadForm1 sendPostContent={sendPostContent}/>
        
    </>
}