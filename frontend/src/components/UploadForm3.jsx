import React from 'react'
import { useState } from 'react';

export default function UploadForm3({ files, title, type }) {
   



    return (
        <>
            <div className="container mt-5 min-vh-100">
                <div className="row justify-content-md-center">
                    <div className="col-5">
                        <h3>{title}</h3>
                        <h5>{type}</h5>
                        <div className="text-center mt-3">
                            {files.map((item, index) => {
                                return <img id="target" src={this.item}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
