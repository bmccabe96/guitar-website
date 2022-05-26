import React, { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router";
import styled from "styled-components";


const AddGuitar = (props) => {

  const navigate = props.navigate;

  const [brandsAndTypes, setBrandsAndTypes] = useState(null);

  useEffect(() => {
    getTypesAndBrands();
  }, []);

  //Get types and brands from API
  const getTypesAndBrands = () => {
    fetch("/catalog/guitar/create",
            {
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }
    )
      .then(res => res.json())
      .then(res => setBrandsAndTypes(res));
  }

  const TESTGUITAR = {
    name: 'blah',
    description: 'blahblah',
    brand: 'Fender',
    type: ['Acoustic'],
    price: 100,
    image: ''
  }

  //NOTE
  //NEED TO UPDATE THIS TO WORK WITH REAL POST DATA
  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/catalog/guitar/create', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(TESTGUITAR),
    })
      .then(res => res.json())
      .then(url => navigate('/'))
  }

  if (brandsAndTypes) {
    return (
      <FormContainer>
        <form method='POST' action='' style={formStyle} onSubmit={handleSubmit}>
          <div className="form-group form-text">
            <p>Enter guitar name:</p>
            <input type='text' required='true' id='name' name='name' />
          </div>
          <div className="form-group form-textbox">
            <p>Describe the guitar:</p>
            <textarea required='true' id='description' name='description' />
          </div>
          <div className="form-group select">
            <p>Select brand:</p>
            <select id='brand' type='select' name='brand' placeholder="Select brand" required='true'>
              {brandsAndTypes.brands.map(brand => {
                return (
                  <option key={brand._id} value={brand._id}>{brand.name}</option>
                )
              })}
            </select>
          </div>
          <div className="form-group checkbox">
            <p>Select types:</p>
            {brandsAndTypes.types.map(type => {
              return (
                <div>
                  <label for={type._id}>{type.name} </label>
                  <input type='checkbox' id={type._id} name='type' value={type._id}/>
                </div>
              )
            })}
          </div>
          <div className="form-group form-num">
            <p>How much does it cost?</p>
            <input type='number' required='true' id='price' name='price' min='0'/>
          </div>
          <div className="form-group form-text">
            <p>Enter a link the image:</p>
            <input type='text' id='image' name='image' />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </FormContainer>
    )
  }
  else {
    return (
      <h1>LOADING...</h1>
    )
  }
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  padding: '2rem',
  gap: '2rem'
}

const FormContainer = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px; 
  margin: 0 auto;
  border-radius: 1rem;
  width: 75vw;
  margin-top: 25px;
`

export default AddGuitar;