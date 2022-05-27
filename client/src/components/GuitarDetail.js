import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { currencyFormatter } from "../utils";

const GuitarDetail = (props) => {

  const dummyImage = props.dummyImage;

  const [guitar, setGuitar] = useState(null);
  const [imgError, setImgError] = React.useState(false);


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
      <Container>
        <ImgContainer>
        {
          !imgError
          ? 
          <img style={myImgStyle} alt={`${guitar.name} item`} src={guitar.image} onError={() => setImgError(true)}/>
          :
          <img style={myImgStyle} alt={`dummy guitar`} src={dummyImage}/>
        }
        </ImgContainer>
        {
        imgError
        ?
        <em>Image failed, here's a cartoon</em>
        :
        null
        }
        <h1>{guitar.name}</h1>
        <h2>{guitar.brand.name}</h2>
        <p>{guitar.description}</p>
        <BottomRow>
          <BottomLeft>
            {
              guitar.type.map(type => {
                return <h4 key={type._id}>{type.name}</h4>
              })
            }
          </BottomLeft>
          <h3>{currencyFormatter.format(guitar.price)}</h3>
        </BottomRow>
        <MyButton>Update</MyButton>
        <MyButton>Delete</MyButton>
      </Container>
    )
  }
  else {
    return (
      <h1>LOADING</h1>
    )
  }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  padding: 10px 0;
  background-color: white;
  border-radius: 1rem;
  margin: 25px 75px;
  text-align: center;
  padding: 25px;
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

const BottomLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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

  &:hover {
    box-shadow: 0 5px 15px rgb(0,0,0,0.15);
  }
`


const ImgContainer = styled.div`
  width: 225px;
  height: auto;
`

const myImgStyle = {
  width: "100%",
  height: "auto"
}

export default GuitarDetail;