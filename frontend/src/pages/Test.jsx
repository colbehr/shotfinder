import React from 'react'
import NavBar from '../components/Navbar';
import { useState, useEffect } from 'react'
import UploadForm3 from '../components/upload/UploadForm3';


export default function Test() {

    const [upload2Content, setUpload2Content] = useState({})

    useEffect(() => {
        createFile()
    }, [])

    async function createFile(){
        let response = await fetch('data:image/png;base64,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');
        let data = await response.blob();
        let metadata = {
          type: 'image/jpeg'
        };
        let file = new File([data], "test.jpg", metadata);
        let file2 = new File([data], "test.jpg", metadata);
        setUpload2Content([file, file2])
      }
    return (<>
        <NavBar />

        <UploadForm3 title={"Pulp Fiction"} type={"Movie"} files={Array.from(upload2Content || [])} ></UploadForm3>
    </>
    )
}

