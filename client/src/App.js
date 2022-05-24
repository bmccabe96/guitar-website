import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AllContent from './components/AllContent';



function App() {

  let navigate = useNavigate();

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
