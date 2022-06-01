import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import GuitarItem from "./GuitarItem";

const Home = (props) => {

  const selectedBrand = props.selectedBrand;
  const setSelectedBrand = props.setSelectedBrand;
  const selectedType = props.selectedType;
  const setSelectedType = props.setSelectedType;
  const guitarList = props.guitarList;
  const getGuitarList = props.getGuitarList;

  //const [guitarList, setGuitarList] = useState(null);
  const navigate = props.navigate;
  const dummyImage = props.dummyImage;
  const [brandList, setBrandList] = useState(null);
  const [typeList, setTypeList] = useState(null);
  const filteredList = useMemo(getFilteredList, [selectedBrand, selectedType, guitarList]);

  //Load list 
  useEffect(() => {
    getGuitarList();
    getBrandList();
    getTypeList();
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

  const getTypeList = () => {
    fetch("/catalog/types",
            {
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }
    )
      .then(res => res.json())
      .then(res => setTypeList(res));
  }

  const navToAddGuitar = () => {
    navigate('/create');
  }

  const handleBrandChange = () => {
    const selectBox = document.getElementById("brandList");
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if(selectedValue === 'all') {
      setSelectedBrand('all');
    }
    else {
      setSelectedBrand(selectedValue);
    }
  }

  const handleTypeChange = () => {
    const selectBox = document.getElementById("typeList");
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if(selectedValue === 'all') {
      setSelectedType('all');
    }
    else {
      setSelectedType(selectedValue);
    }
  }

  function hasItemWithKeyAndValue(arr, key, value) {
    return arr.some(item => item[key] === value);
  }

  function getFilteredList() {
    if(selectedBrand === 'all' && selectedType === 'all') {
      console.log(1)
      return guitarList;
    }
    else if (selectedBrand === 'all' && selectedType !== 'all') {
      console.log(2)
      return guitarList.filter(guitar => hasItemWithKeyAndValue(guitar.type, '_id', selectedType))
    }
    else if (selectedBrand !== 'all' && selectedType === 'all') {
      console.log(3)
      return guitarList.filter(guitar => guitar.brand._id === selectedBrand)
    }
    else {
      console.log(4)
      return guitarList.filter(guitar => {
        if (guitar.brand._id === selectedBrand && hasItemWithKeyAndValue(guitar.type, '_id', selectedType)) {
          return true;
        }
        return false;
      })
    }
    
  }
  
  if (guitarList && brandList && typeList) {
    return (
      <div className="home">
        <MyButton onClick={navToAddGuitar}>Add Guitar</MyButton>
        <div className="brand-filter">
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
        <div className="type-filter">
          <div>Filter by type:</div>
          <select name="typeList" id="typeList" onChange={handleTypeChange} value={selectedType}>
          <option value="all">All</option>
            {
              typeList.map(type => {
                return <option key={type._id} value={type._id}>{type.name}</option>
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