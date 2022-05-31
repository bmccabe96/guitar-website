import React, { useState, useEffect, createRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const BrandForm = (props) => {

  const navigate = props.navigate;
  const { id } = useParams();
  const isUpdateMode = !!id;

  const [currentBrand, setCurrentBrand] = useState(null);
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
  });
  const [formErrors, setFormErrors] = useState([]);


  const returnToBrands = () => {
    navigate('/brands');
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setInputs(prevState => ({ ...prevState, [name]: value }));
  };

  async function handleSubmit (e) {
    e.preventDefault();
    setFormErrors([]);
    if (!isUpdateMode) {
      const brand = {
        name: inputs.name,
        description: inputs.description,
      };
      let newErrors = [];
      for (let key in brand) {
        if(!brand[key] && key !== 'image') {
          newErrors.push(`Must input valid ${key}`);
        }
      }
      setFormErrors(newErrors);
      if (newErrors.length === 0) {
        await fetch('/catalog/brand/create', {
          method: 'POST',
          headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
          body: JSON.stringify(brand),
        })
          //.then(res => console.log(res))
          .then(res => navigate('/brands'))
      }
      else {
        return;
      }   
    }
    else {
      return;
    }
  }

  if (!isUpdateMode) {
    return (
      <FormContainer>
        <svg onClick={returnToBrands} style={{width: '24px', height: '24px', justifySelf: 'start', cursor: 'pointer', marginLeft: '25px', marginTop:'25px'}} viewBox="0 0 24 24">
            <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
          </svg>
          <h1 style={{textAlign: 'center'}}>{isUpdateMode ? "Update Brand" : "Add Brand"}</h1>
          <form method='POST' action='' style={formStyle} onSubmit={handleSubmit}>
          <div className="form-group form-text">
              <p>Enter brand name:</p>
              <input type='text'  id='name' name='name' value={inputs.name} onChange={handleInputChange}/>
            </div>
            <div className="form-group form-textbox">
              <p>Describe the brand:</p>
              <textarea id='description' name='description' value={inputs.description} onChange={handleInputChange} />
            </div>
            <MyButton type='submit'>Submit</MyButton>
          </form>
      </FormContainer>
    )
  }
  else {
    if (currentBrand) {
      return (
        <p>Blah blah</p>
      )
    }
    else {
      return (
        <h1 style={{marginTop: '20px', textAlign: 'center'}}>...</h1>
      )
    }
  }
}


const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  padding: '25px',
  gap: '2rem'
}

const FormContainer = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px; 
  margin: 0 auto;
  border-radius: 1rem;
  width: 75vw;
  margin-top: 25px;
  margin-bottom: 85px;
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

export default BrandForm;