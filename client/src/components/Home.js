import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import GuitarItem from "./GuitarItem";

const Home = (props) => {

  const [guitarList, setGuitarList] = useState(null);
  const navigate = props.navigate;
  const dummyImage = props.dummyImage;

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

  const navToAddGuitar = () => {
    navigate('/create');
  }
  
  if (guitarList) {
    return (
      <div className="home">
        <MyButton onClick={navToAddGuitar}>Add Guitar</MyButton>
        <GuitarListContainer>
          {guitarList.map( guitar => {
            return <GuitarItem
              guitar={guitar}
              key={guitar._id}
              dummyImage={dummyImage}
              navigate={navigate}
            />
          })}
        </GuitarListContainer>
      </div>
    )
  }
  else {
    return (
      <h1 style={{marginTop: '20px', textAlign: 'center'}}>...</h1>
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
  margin-bottom: 60px;
`

const MyButton = styled.button`
  color: black;
  padding: 5px 10px;
  border-radius: 4px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin-top: 25px;
  width: 12rem;
  align-self: center;
  background-color: rgb(0,0,255, 0.3);

  &:hover {
    box-shadow: 0 5px 15px rgb(0,0,0,0.15);
  }
`

export default Home;