import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Home = () => {

  const [guitarList, setGuitarList] = useState();

  //Load list 
  useEffect(() => {
    getGuitarList();
  }, [])

  const getGuitarList = () => {
    fetch("/catalog/guitars",
            {
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }
    )
      .then(res => res.json())
      .then(res => setGuitarList(res));
  }
  
  return (
    <p>TESTING HOME ROUTE</p>
  )
}

export default Home;