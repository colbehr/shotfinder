
import UploadForm from '../components/upload/UploadForm';
import NavBar from '../components/Navbar';
import UploadNavbarMid from '../components/upload/UploadNavbarMid';
import { useState } from "react";


/**
 * Wrapper for the form objects, also keeps track of what step
 * we are on so that the nav can update 
 */
export default function Upload() {

    const [step, setStep] = useState(1)
    
    return <>
        <NavBar MiddleComponent={ <UploadNavbarMid step={step}/> }/>
        <UploadForm setStep={setStep}/>
   </>
}