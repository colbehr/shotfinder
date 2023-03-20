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


export async function postFrames(form_data){
    try {
        const options = {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data' // this is default
            },
            body: form_data
        };
        fetch( '/frames', options)
            .then( response => {
                return response
            } );
    } catch (error) {
        return error
    }
}