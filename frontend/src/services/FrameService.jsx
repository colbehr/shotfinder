export async function getAllFrames(){
    try {
        const res = await fetch('/frames')
        return await res.json()
    } catch (error) {
        return []
    }
}


/**
 * Gets a frame by id, in use by the single frame page
 * @param {} id 
 * @returns 
 */
export async function getOneFrame(id){
    try {
        const res = await fetch('/frames/'+id)
        return await res.json()
    } catch (error) {
        return []
    }
}


export async function postFrames(content){
    try {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( content )  
        };
        console.log(options);
        fetch( '/frames', options)
            .then( response => response.json() )
            .then( response => {
                console.log(response);
            } );
    } catch (error) {
        return []
    }
}