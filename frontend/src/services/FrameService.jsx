export async function getAllFrames(){
    
    try {
        const res = await fetch('/frames')
        return await res.json()
    } catch (error) {
        return []
    }
}