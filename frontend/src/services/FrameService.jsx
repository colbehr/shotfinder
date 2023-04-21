export async function getAllFrames(){
    try {
        const res = await fetch('http://localhost:3001/frames').then()
        return await res.json()
    } catch (error) {
        console.log(error);
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
        const res = await fetch('http://localhost:3001/frames/'+id)
        return await res.json()
    } catch (error) {
        console.log(error);
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
        fetch( 'http://localhost:3001/frames', options)
            .then( response => {
                return response
            } );
    } catch (error) {
        console.log(error);
        return error
    }
}

export async function patchFrames(jsonData){
    try {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        };
        fetch( 'http://localhost:3001/frames/'+jsonData._id, options)
            .then( res => {
                console.log(res);
            })
            .then( response => {
                return response
            } );
    } catch (error) {
        console.log(error);
        return error
    }
}

export async function deleteFrame(jsonData){
    try {
        const options = {
            method: 'DELETE',
        };
        fetch( 'http://localhost:3001/frames/'+jsonData._id, options)
            .then( res => {
                console.log(res);
            })
            .then( response => {
                return response
            } );
    } catch (error) {
        console.log(error);
        return error
    }
}


/**
 * get Tags
 * @param {} id 
 * @returns 
 */
export async function searchTags(tagSearchTerm){
    try {
        const res = await fetch('http://localhost:3001/tags?search='+tagSearchTerm)
        return await res.json()
            
    } catch (error) {
        console.log('error', error);
        return []
    }
}


/**
 * get movie frames
 * @param {} id 
 * @returns 
 */
export async function getMovieFrames(movie,id){
    try {
        const res = await fetch('http://localhost:3001/frames/movie?movie='+movie+"&id="+id)
        return await res.json()
            
    } catch (error) {
        console.log('error', error);
        return []
    }
}
