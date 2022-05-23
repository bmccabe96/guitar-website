import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {

const [typeList, setTypeList] = useState();
const [brandList, setBrandList] = useState();
const [guitarList, setGuitarList] = useState();


useEffect(() => {
  getTypeList();
  getBrandList();
  getGuitarList();
}, [])

const getTypeList = () => {
  fetch("http://localhost:9000/catalog/types",
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
  fetch("http://localhost:9000/catalog/brands",
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
  fetch("http://localhost:9000/catalog/guitars",
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
