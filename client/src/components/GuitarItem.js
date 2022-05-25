import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const GuitarItem = (props) => {

  const guitar = props.guitar;

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Card>
      <h2>{guitar.name}</h2>
      <p>{currencyFormatter.format(guitar.price)}</p>
      <p>{guitar.brand.name}</p>
      <ImgContainer>
        <img style={myImgStyle} alt={`${guitar.name} item`} src={guitar.image} />
      </ImgContainer>
    </Card>
  )

}

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  cursor: pointer;
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