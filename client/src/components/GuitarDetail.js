import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";


const GuitarDetail = (props) => {

  const [guitar, setGuitar] = useState(null)

  useEffect(() => {
    const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const getGuitar = () => {
      fetch(`/catalog/guitar/${id}`,
              {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              }
      )
        .then(res => res.json())
        .then(res => setGuitar(res));
    }
    getGuitar();
  }, []);



  if (guitar) {
    return (
      <p>{guitar.name + " " + guitar.description}</p>
    )
  }
  else {
    return (
      <h1>LOADING</h1>
    )
  }
}

export default GuitarDetail;