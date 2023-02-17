import React from 'react'

export default function SearchBar ({setSearchTerm}){
    return (
        <>
            <label htmlFor="" className='inline'>
            <input type="text" className='form-control' placeholder='Grass Hill, Close Up, Day' onChange={(e) => setSearchTerm(e.target.value)}/>
            </label>
        </>
    )
}
