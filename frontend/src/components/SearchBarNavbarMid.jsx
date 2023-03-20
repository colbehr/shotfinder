import React from 'react';
import { useState, useEffect } from "react";
import Select from 'react-select'

/**
 * The select element for searching tags, gets used in the navbar additionalComponent
 * @param {} searchTerm 
 * @param {} setSearchTerm 
 */
export default function SearchBar({ setSearchTerm }) {
    const [options, setOptions] = useState([])
    const [tagSearchTerm, setTagSearchTerm] = useState("")

    // add an event listener for keyup events
    // something about the onKeyUp event on 
    // the select component was not working
    useEffect(() => {
        window.addEventListener("keyup", (e) => { setTagSearchTerm(e.target.value) });
        return () => {
            window.removeEventListener("keyup", (e) => { setTagSearchTerm(e.target.value) });
        };
    }, []);

    //When a new key is pressed, we requery the tag db for some new search terms
    useEffect(() => {
        fetch('http://localhost:3001/tags?search=' + tagSearchTerm)
            .then(response => response.json())
            .then(data => {
                data.map(x => {
                    x.label = x.tag[0].toUpperCase() + x.tag.substring(1);
                    x.value = x.tag;
                    return x
                })
                setOptions(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [tagSearchTerm])

    //when enter is hit, then we set the search term and find new frames
    const handleChange = (event) => {
        let str = ""
        event.map((x) => str = str + "," + x.value)
        setSearchTerm(str.substring(1))
        setTagSearchTerm("")
        console.log("Search: ", str.substring(1));
    }
    const style = {
        control: base => ({
          ...base,
          border: 0,
          // This line disable the blue border
          boxShadow: 'none'
          
        })
      };

    return (
        <>
            <Select
                isMulti
                options={options}
                className="selectNav basic-multi-select"
                classNamePrefix="select"
                placeholder={'Grass, Close Up, Day'}
                onChange={handleChange}
                styles={style}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: '#ADB5B8',
                      primary: 'black',
                }})}
            />
        </>
    )
}
