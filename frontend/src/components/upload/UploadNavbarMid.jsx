
export default function UploadNavbarMid( {step=1} ) {
    let activeStyle = {
        color: "white",
    };

    return  <div className="formProgress justify-content-center mt-2 ">
                <p style={step >= 1 ? activeStyle : {}}>
                    Import Film Data
                </p>
                <p style={step >= 2 ? activeStyle : {}}>
                    Import Frames
                </p>
                <p style={step >= 3 ? activeStyle : {}}>
                    Tag Frames
                </p>
                <p style={step >= 4 ? activeStyle : {}}>
                    Submit
                </p>
            </div>
}