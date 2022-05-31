import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const ListItem = (props) => {

  const brand = props.brand;
  const setSelectedBrand = props.setSelectedBrand;
  const navigate = props.navigate;
  const getBrandList = props.getBrandList;

  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
  });

  function seeGuitarsByBrand(e) {
    navigate("/");
    setSelectedBrand(e.target.id);
  }

  const enterEditMode = () => {
    setIsEditMode(true);
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.type === 'textarea') {
      setInputs(prevState => ({ ...prevState, description: target.value }));
    } 
    else if (target.type === 'text') {
      setInputs(prevState => ({ ...prevState, name: target.value }));
    }
  };

  async function handleSubmit(e) {
    const newBrand = {
      name: inputs.name ? inputs.name : brand.name,
      description: inputs.description ? inputs.description : brand.description,
      id: brand._id,
    };
    await fetch(`/catalog/brand/update`, {
      method: 'POST',
      headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
      body: JSON.stringify(newBrand),
    })
      //.then(res => console.log(res))
      .then(res => navigate('/brands'))
    getBrandList();
    setIsEditMode(false);
  }

  const cancelSubmit = () => {
    setIsEditMode(false);
  }

  async function handleDelete(e) {
    console.log(brand._id);
    await fetch(`/catalog/brand/delete`, {
      method: 'POST',
      headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
      body: JSON.stringify({ _id: brand._id }),
    })
      //.then(res => console.log(res))
      .then(res => navigate('/brands'))
    getBrandList();
  }

  if (!isEditMode) {
    return (
      <ListItemContainer>
        <Category>{brand.name}</Category>
        <Description>{brand.description}</Description>
        <Actions>
          <MyButton id={brand._id} onClick={seeGuitarsByBrand}>See guitars</MyButton>
          <MyButton onClick={enterEditMode}>Edit</MyButton>
          {
            confirmDelete ?
            <span>
              <MyButton onClick={handleDelete} style={{backgroundColor: 'rgb(255,0,0,0.4)'}}>Delete</MyButton>
              <MyButton onClick={() => setConfirmDelete(false)} style={{backgroundColor: 'white'}}>Cancel</MyButton>
            </span>
            :
            <MyButton onClick={() => setConfirmDelete(true)} style={{backgroundColor: 'rgb(255,0,0,0.4)'}}>Delete</MyButton>
          }
          
        </Actions>
      </ListItemContainer>
    )
  }
  else {
    return (
      <ListItemContainer>
        <CategoryUpdate onChange={handleInputChange} type="text" defaultValue={brand.name} />
        <DescriptionUpdate onChange={handleInputChange} defaultValue={brand.description}></DescriptionUpdate>
        <Actions>
          <MyButton id={brand._id} onClick={seeGuitarsByBrand} disabled style={{backgroundColor: 'grey'}}>See guitars</MyButton>
          <MyButton style={{backgroundColor: 'rgb(0,0,255,0.4)'}} onClick={handleSubmit}>Confirm</MyButton>
          <MyButton style={{backgroundColor: 'rgb(255,0,0,0.4)'}} onClick={cancelSubmit}>Cancel</MyButton>
          <MyButton disabled style={{backgroundColor: 'grey'}}>Delete</MyButton>
        </Actions>
      </ListItemContainer>
    )
  }
  

}

const Category = styled.h2`
  grid-colyumn: 1 / 2;
  padding: 10px 0 10px 10px;
`

const CategoryUpdate = styled.input`
  grid-colyumn: 1 / 2;
  padding: 10px 0 10px 10px;
  font-size: 1.5em;
  font-weight: bold;
  margin-block-start: .83em;
  margin-block-start: .83em;
  margin-inline-start: 0px;
  margin-inline-start: 0px;
  border: none;
  max-width: 100%;
  background-color: #eeeeee;
  margin: 0;
  outline: none;
`

const Description = styled.p`
  grid-column: 2 / 3;
  padding-right: 10px;
  text-align: left;

  @media only screen and (max-width: 40em) {
    text-align: center;
  }
`

const DescriptionUpdate = styled.textarea`
  grid-column: 2 / 3;
  padding-right: 10px;
  text-align: left;
  border: none;
  font-family: sans-serif;
  background-color: #eeeeee;
  height: 100% !important;
  width: 100%;
  outline: none;

  @media only screen and (max-width: 40em) {
    text-align: center;
    height: 75px !important;
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
    display: flex;
    flex-direction: column
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

