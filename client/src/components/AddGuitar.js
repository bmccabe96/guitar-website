import React, { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router";
import styled from "styled-components";


const AddGuitar = (props) => {

  const navigate = props.navigate;

  const [brandsAndTypes, setBrandsAndTypes] = useState(null);
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    image: '',
  });
  const [typeInputs, setTypeInputs] = useState('');
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/catalog/guitar/create");
      const data = await res.json();
      setBrandsAndTypes(data);
    }
    async function getTypesData() {
      const res = await fetch("/catalog/types");
      const data = await res.json();
      const initialTypeState = [];
      for (let i=0; i< data.length; i++) {
        initialTypeState.push({ checked: false, name: data[i].name, _id: data[i]._id })
      }
      setTypeInputs(initialTypeState);
    }
    fetchData();
    getTypesData();
  }, []);


  const handleInputChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setInputs(prevState => ({ ...prevState, [name]: value }));
  };

  const handleBrandInputChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputs(prevState => ({ ...prevState, [name]: value }));
  }

  const handleTypeInputChange = (position) => {
    const newTypeInputs = typeInputs.map((item, index) => {
      if (index === position) {
        item.checked = !item.checked;
      }
      return item;
    })
    setTypeInputs(newTypeInputs);
  }

  //HANDLE SUBMIT
  //PROVIDES VALIDATION VIA STATE
  async function handleSubmit(e) {
    e.preventDefault();
    setFormErrors([]);
    const guitar = {
      name: inputs.name,
      description: inputs.description,
      brand: inputs.brand,
      type: typeInputs.map(item => item.checked ? item._id : null).filter(item => item),
      price: parseFloat(inputs.price),
      image: inputs.image,
    };

    let newErrors = [];
    for (let key in guitar) {
      if(!guitar[key] && key !== 'image') {
        newErrors.push(`Must input valid ${key}`);
      }
    }
    setFormErrors(newErrors);
    console.log(newErrors);
    if (newErrors.length === 0) {
      await fetch('/catalog/guitar/create', {
        method: 'POST',
        headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
        body: JSON.stringify(guitar),
      })
        //.then(res => console.log(res))
        .then(res => navigate('/'))
    }
    else {
      return;
    }   
  }

  if (brandsAndTypes) {

    if (typeInputs)
    {
      return (
        <FormContainer>
          <form method='POST' action='' style={formStyle} onSubmit={handleSubmit}>
            <div className="form-group form-text">
              <p>Enter guitar name:</p>
              <input type='text'  id='name' name='name' value={inputs.name} onChange={handleInputChange}/>
            </div>
            <div className="form-group form-textbox">
              <p>Describe the guitar:</p>
              <textarea id='description' name='description' value={inputs.description} onChange={handleInputChange} />
            </div>
            <div className="form-group select">
              <p>Select brand:</p>
              <select id='brand' type='select' name='brand' placeholder="Select brand" defaultValue={'Select brand'} onChange={handleBrandInputChange}>
                <option key="non-option" value="Select brand" disabled>Select brand</option>
                {brandsAndTypes.brands.map(brand => {
                  return (
                    <option key={brand._id} value={brand._id}>{brand.name}</option>
                  )
                })}
              </select>
            </div>
            <div className="form-group checkbox">
              <p>Select types:</p>
              {typeInputs.map((type, index) => {
                return (
                  <div key={type._id}>
                    <label htmlFor={type._id}>{type.name} </label>
                    <input type='checkbox' id={type._id} value={type._id} name={type._id} checked={typeInputs[index].checked} onChange={() => handleTypeInputChange(index)} />
                  </div>
                )
              })}
            </div>
            <div className="form-group form-num">
              <p>How much does it cost?</p>
              <input type='number' id='price' name='price' min='0' value={inputs.price} onChange={handleInputChange}/>
            </div>
            <div className="form-group form-text">
              <p>Enter a link the image:</p>
              <input type='text' id='image' name='image' value={inputs.image} onChange={handleInputChange}/>
            </div>
            <button type='submit'>Submit</button>
            <div>
              {
                formErrors
                ?
                formErrors.map((error, index) => {
                  return <ErrorText key={index}>{error}</ErrorText>
                })
                :
                null
              }
            </div>
          </form>
        </FormContainer>
      )
    }
    else {
      return (
        <h1>Loading</h1>
      )
    }
    
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
  margin-bottom: 85px;
`

const ErrorText = styled.p`
  color: red;
  font-weight: 400;
  font-size: 1.2rem;
  margin: 0;
`

export default AddGuitar;