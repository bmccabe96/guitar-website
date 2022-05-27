import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { currencyFormatter } from "../utils";

const GuitarItem = (props) => {

  const guitar = props.guitar;
  const dummyImage = props.dummyImage;
  const navigate = props.navigate;

  const [imgError, setImgError] = React.useState(false);

  const goToGuitarDetail = () => {
    navigate('/guitar/' + guitar._id)
  }

  return (
    <Card>
      <h2 style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={goToGuitarDetail}>{guitar.name}</h2>
      <p>{currencyFormatter.format(guitar.price)}</p>
      <p>{guitar.brand.name}</p>
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
    </Card>
  )

}

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  padding: 10px 0;
  background-color: white;
  border-radius: 1rem;
`

const ImgContainer = styled.div`
  width: 150px;
  height: auto;
`

const myImgStyle = {
  width: "100%",
  height: "auto"
}

export default GuitarItem;