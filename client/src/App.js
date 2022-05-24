import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AllContent from './components/AllContent';



function App() {

const [typeList, setTypeList] = useState();
const [brandList, setBrandList] = useState();
const [guitarList, setGuitarList] = useState();

let navigate = useNavigate();

//Load list 
useEffect(() => {
  getTypeList();
  getBrandList();
  getGuitarList();
}, [])

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

const getGuitarList = () => {
  fetch("/catalog/guitars",
          {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
  )
    .then(res => res.json())
    .then(res => setGuitarList(res));
}

const clickedHome = () => {
  navigate("/");
}

const clickedBrands = () => {
  navigate("/brands");
}

const clickedTypes = () => {
  navigate("/types");
}

  return (
    <div className="App">
      <AllContent
        clickedAll={clickedHome}
        clickedBrands={clickedBrands}
        clickedTypes={clickedTypes}
        navigate={navigate}
      />
    </div>
  );
}

export default App;
