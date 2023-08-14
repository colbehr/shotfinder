import React from "react";

export default function GradientImage(props) {
    let canvas; // declare a variable to store the canvas element

    // define a callback function that assigns the canvas element to the variable
    function handleCanvas(canvasElement) {
        canvas = canvasElement;
        draw(); // call the draw function when the canvas is ready
    }

    // define a function that draws on the canvas
    function draw() {
        if (canvas) {
            // check if the canvas is not null
            const ctx = canvas.getContext("2d");
            // get the gradient index from the props
            const index = getGradientIndex(props.text || "43");
            // check if the index is valid
            if (index >= 0 && index < gradients.length) {
                // get the gradient object from the array
                const gradient = gradients[index];
                // create a linear gradient with the start and end colors and angle
                const linearGradient = ctx.createLinearGradient(
                    0,
                    0,
                    Math.cos(gradient.angle * Math.PI / 180) * canvas.width,
                    Math.sin(gradient.angle * Math.PI / 180) * canvas.height
                );
                linearGradient.addColorStop(0, gradient.start);
                linearGradient.addColorStop(1, gradient.end);
                // fill the canvas with the gradient
                ctx.fillStyle = linearGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

            }
        }
    }

    return <canvas ref={handleCanvas} width={42} height={42} className="rounded-circle" />;
}

// define an array of 25 gradient objects
const gradients = [
    { start: "#dad299", end: "#b0dab9", angle: 0 }, // A
    { start: "#f2709c", end: "#ff9472", angle: 45 }, // B
    { start: "#e6dada", end: "#274046", angle: 90 }, // C
    { start: "#5d4157", end: "#a8caba", angle: 135 }, // D
    { start: "#ddd6f3", end: "#faaca8", angle: 180 }, // E
    { start: "#616161", end: "#9bc5c3", angle: 225 }, // F
    { start: "#50c9c3", end: "#96deda", angle: 270 }, // G
    { start: "#b92b27", end: "#1565c0", angle: 315 }, // H
    { start: "#373b44", end: "#4286f4", angle: 0 }, // I
    { start: "#ff0099", end: "#493240", angle: 45 }, // J
    { start: "#1f4037", end: "#99f2c8", angle: 90 }, // K
    { start: "#f953c6", end: "#b91d73", angle: 135 }, // L
    { start: "#c31432", end: "#240b36", angle: 180 }, // M
    { start: "#f12711", end: "#f5af19", angle: 225 }, // N
    { start: "#659999", end: "#f4791f", angle: 270 }, // O
    { start: "#dd3e54", end: "#6be585", angle: 315 }, // P
    { start: "#544a7d", end: "#ffd452", angle: 0 }, // Q
    { start: "#009fff", end: "#ec2f4b", angle: 45 }, // R
    { start: "#654ea3", end: "#eaafc8", angle: 90 }, // S
    { start: "#43e97b", end: "#38f9d7", angle: 135 }, // T
    { start: "#5ee7df", end: "#b490ca", angle: 180 },// U 
    { start: "#fdfcfb", end: "#e2d1c3", angle: 225 },// V 
    { start: "#fddb92", end: "#d1fdff", angle: 270 },// W 
    { start: "#6a11cb", end: "#2575fc", angle: 315 },// X 
    { start: "#c471f5", end: "#fa71cd", angle: 0 },// Y 
    { start: "#ebbba7", end: "#cfc7f8", angle: 45 }// Z
];

// write a function that returns the gradient index from a string
function getGradientIndex(str) {
    if (str.length === 0) return -1; // handle empty string
    const code = str.charCodeAt(0); // get ASCII code of first letter
    if (code >= 65 && code <= 90) return code - 65; // handle uppercase letters
    if (code >= 97 && code <= 122) return code - 97; // handle lowercase letters
    return -1; // handle other characters
}

