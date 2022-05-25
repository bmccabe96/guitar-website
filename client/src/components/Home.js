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
      <div className="home">
        <MyButton>Add Guitar</MyButton>
        <GuitarListContainer>
          {guitarList.map( guitar => {
            return <GuitarItem
              guitar={guitar}
              key={guitar._id}
            />
          })}
        </GuitarListContainer>
      </div>
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

const MyButton = styled.button`
  color: black;
  padding: 5px 10px;
  border-radius: 4px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin-top: 25px;

  &:hover {
    box-shadow: 0 5px 15px rgb(0,0,0,0.15);
  }
`

export default Home;