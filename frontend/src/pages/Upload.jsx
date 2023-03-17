
import UploadForm from '../components/upload/UploadForm';
import NavBar from '../components/Navbar';
import UploadNavbarMid from '../components/upload/UploadNavbarMid';
import { useState } from "react";

export default function Upload() {

    const [step, setStep] = useState(1)
    
    return <>
        <NavBar MiddleComponent={ <UploadNavbarMid step={step}/> }/>
        <UploadForm setStep={setStep}/>
   </>
}