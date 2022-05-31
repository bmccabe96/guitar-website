import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import GuitarItem from "./GuitarItem";

const Home = (props) => {

  const selectedBrand = props.selectedBrand;
  const setSelectedBrand = props.setSelectedBrand;
  const guitarList = props.guitarList;
  const getGuitarList = props.getGuitarList;

  //const [guitarList, setGuitarList] = useState(null);
  const navigate = props.navigate;
  const dummyImage = props.dummyImage;
  const [brandList, setBrandList] = useState(null);
  const filteredList = useMemo(getFilteredList, [selectedBrand, guitarList]);

  //Load list 
  useEffect(() => {
    getGuitarList();
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

  const navToAddGuitar = () => {
    navigate('/create');
  }

  const handleBrandChange = (e) => {
    const selectBox = document.getElementById("brandList");
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if(selectedValue === 'all') {
      setSelectedBrand('all');
    }
    else {
      setSelectedBrand(selectedValue);
    }
  }

  function getFilteredList() {
    if(selectedBrand==='all') {
      return guitarList;
    }
    return guitarList.filter(guitar => guitar.brand._id === selectedBrand)
  }
  
  if (guitarList && brandList) {
    return (
      <div className="home">
        <MyButton onClick={navToAddGuitar}>Add Guitar</MyButton>
        <div className="brandFilter">
          <div>Filter by brand:</div>
          <select name="brandList" id="brandList" onChange={handleBrandChange} value={selectedBrand}>
            <option value="all">All</option>
            {
              brandList.map(brand => {
                return <option key={brand._id} value={brand._id}>{brand.name}</option>
              })
            }
          </select>
        </div>
        <GuitarListContainer>
          {filteredList.map( guitar => {
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