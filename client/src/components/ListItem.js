import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const ListItem = (props) => {

  const item = props.item;
  const setSelectedItem = props.setSelectedItem;
  const resetItem = props.resetItem;
  const navigate = props.navigate;
  const getItemList = props.getItemList;
  const guitarList = props.guitarList;
  const clickedTab = props.clickedTab;


  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
  });
  const [allowDelete, setAllowDelete] = useState(true);

  function seeGuitarsByItem(e) {
    navigate("/");
    setSelectedItem(e.target.id);
    resetItem('all');
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
    const url = clickedTab === 'brands' ? '/catalog/brand/update' : '/catalog/type/update';
    const newItem = {
      name: inputs.name ? inputs.name : item.name,
      description: inputs.description ? inputs.description : item.description,
      id: item._id,
    };
    await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
      body: JSON.stringify(newItem),
    })
      //.then(res => console.log(res))
      .then(res => navigate(clickedTab === 'brands' ? '/brands' : '/types'))
    getItemList();
    setIsEditMode(false);
  }

  const cancelSubmit = () => {
    setIsEditMode(false);
  }

  function hasItemWithKeyAndValue(arr, key, value) {
    return arr.some(item => item[key] === value);
  }

  const handleFirstDeleteClick = () => {
    setConfirmDelete(true);
    let guitars; 
    if (clickedTab==='brands') {
      guitars = guitarList.filter(guitar => guitar.brand._id === item._id);
    }
    else if (clickedTab==='types'){
      guitars = guitarList.filter(guitar => hasItemWithKeyAndValue(guitar.type, '_id', item._id));
    }
    if (guitars.length > 0) {
      setAllowDelete(false);
    }
    else {
      setAllowDelete(true);
    }
  }

  async function handleDelete(e) {
    const url = clickedTab === 'brands' ? '/catalog/brand/delete' : '/catalog/type/delete';
    await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
      body: JSON.stringify({ _id: item._id }),
    })
      //.then(res => console.log(res))
      .then(res => navigate(clickedTab === 'brands' ? '/brands' : '/types'))
    getItemList();
  }

  if (!isEditMode) {
    return (
      <ListItemContainer>
        <Category>{item.name}</Category>
        <Description>{item.description}</Description>
        <Actions>
          <MyButton id={item._id} onClick={seeGuitarsByItem}>See guitars</MyButton>
          <MyButton onClick={enterEditMode}>Edit</MyButton>
          {
            confirmDelete ?
            
              allowDelete ?
                <span>
                  <MyButton onClick={handleDelete} style={{backgroundColor: 'rgb(255,0,0,0.4)'}}>Delete</MyButton>
                  <MyButton onClick={() => setConfirmDelete(false)} style={{backgroundColor: 'white'}}>Cancel</MyButton>
                </span>
              :
                <span>
                  <MyButton style={{backgroundColor: '#eeeeee'}} disabled>Delete</MyButton>
                  <MyButton onClick={() => setConfirmDelete(false)} style={{backgroundColor: 'white'}}>Cancel</MyButton>
                </span>   
            :
            <MyButton onClick={handleFirstDeleteClick} style={{backgroundColor: 'rgb(255,0,0,0.4)'}}>Delete</MyButton>
          }
        </Actions>
        {
          confirmDelete && !allowDelete 
          ?
          <em className='cannot-delete-item'>Must delete associated guitars first</em>
          :
          null
        }
      </ListItemContainer>
    )
  }
  else {
    return (
      <ListItemContainer>
        <CategoryUpdate onChange={handleInputChange} type="text" defaultValue={item.name} />
        <DescriptionUpdate onChange={handleInputChange} defaultValue={item.description}></DescriptionUpdate>
        <Actions>
          <MyButton id={item._id} onClick={seeGuitarsByItem} disabled style={{backgroundColor: 'grey'}}>See guitars</MyButton>
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
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
  padding: 10px;
  border-radius: 5px;

  @media only screen and (max-width: 40em) {
    display: flex;
    flex-direction: column;
  }

`

export default ListItem;

