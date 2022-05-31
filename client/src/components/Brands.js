import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ListItem from "./ListItem";

const Brands = (props) => {

  const navigate = props.navigate;
  const setSelectedBrand = props.setSelectedBrand;
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
      .then(res => {
        setBrandList(res.sort(function(x, y) {
          if (x.name < y.name) {return -1;}
          if (x.name > y.name) {return 1;}
          return 0;
        }));
      });
  }

  const navToAddBrand = () => {
    navigate('/brand/create');
  }

  if (brandList) {
    return (
      <Container>
        <h1>Browse Brands</h1>
        <MyButton onClick={navToAddBrand}>Add brand</MyButton>
        {
          brandList.map(brand => {
            return <ListItem getBrandList={getBrandList} setSelectedBrand={setSelectedBrand} navigate={navigate} key={brand._id} brand={brand} />
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

const MyButton = styled.button`
  color: black;
  padding: 5px 10px;
  border-radius: 4px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  width: 12rem;
  align-self: center;
  background-color: rgb(0,0,255, 0.3);

  &:hover {
    box-shadow: 0 5px 15px rgb(0,0,0,0.15);
  }
`

export default Brands;