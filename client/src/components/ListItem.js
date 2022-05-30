import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const ListItem = (props) => {

  const brand = props.brand;

  return (
    <ListItemContainer>
      <Brand>{brand.name}</Brand>
      <Description>{brand.description}</Description>
      <Actions>
        <MyButton>See guitars</MyButton>
        <MyButton>Edit</MyButton>
        <MyButton style={{backgroundColor: 'rgb(255,0,0,0.4)'}}>Delete</MyButton>
      </Actions>
    </ListItemContainer>
  )

}

const Brand = styled.h2`
  grid-colyumn: 1 / 2;
  padding: 10px 0 10px 10px;
`

const Description = styled.p`
  grid-column: 2 / 3;
  padding-right: 10px;
  text-align: left;

  @media only screen and (max-width: 40em) {
    text-align: center;
  }
`

const Actions = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 5px;
  padding: 10px 0;

  @media only screen and (max-width: 40em) {
    justify-content: center;
  }
`

const MyButton = styled.button`
  color: black;
  padding: 5px 10px;
  border-radius: 4px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  align-self: center;
  background-color: rgb(0,0,255, 0.3);

  &:hover {
    box-shadow: 0 5px 15px rgb(0,0,0,0.15);
  }
`

const ListItemContainer = styled.div`
  display: grid;
  grid-template-columns: 15vw 60vw; 
  justify-items: start;
  align-items: center;
  margin-top: 15px;

  @media only screen and (max-width: 40em) {
    display: flex;
    flex-direction: column;
  }

`

export default ListItem;

