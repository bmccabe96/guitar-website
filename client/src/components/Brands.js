import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ListItem from "./ListItem";

const Brands = () => {

  const [brandList, setBrandList] = useState();

  //Load list 
  useEffect(() => {
    getBrandList();
  }, [])

  const getBrandList = () => {
    fetch("/catalog/brands",
            {
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }
    )
      .then(res => res.json())
      .then(res => setBrandList(res));
  }

  if (brandList) {
    return (
      <Container>
        <h1>Browse Brands</h1>
        {
          brandList.map(brand => {
            return <ListItem key={brand._id} brand={brand} />
          })
        }
      </Container>
    )
  }
  else {
    return (
      <h1 style={{marginTop: '20px', textAlign: 'center'}}>...</h1>
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
  margin: 25px 25px 85px 25px;
  text-align: center;
  padding: 25px;
`

export default Brands;