import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import GuitarItem from "./GuitarItem";

const Home = () => {

  const [guitarList, setGuitarList] = useState(null);

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
  
  if (guitarList) {
    return (
      <GuitarListContainer>
        {guitarList.map( guitar => {
          return <GuitarItem
            guitar={guitar}
            key={guitar._id}
          />
        })}
      </GuitarListContainer>
    )
  }
  else {
    return (
      <h1>LOADING...</h1>
    )
  }
  
}

const GuitarListContainer = styled.div`
  width: auto-fit;
  padding: 25px 75px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  overflow: auto;
  gap: 25px;
`

export default Home;