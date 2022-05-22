import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {

const [testAPI, setTestAPI] = useState('');

useEffect(() => {
  callAPI();
}, [])

const callAPI = () => {
  fetch("http://localhost:9000/testAPI")
    .then(res => res.text())
    .then(res => setTestAPI(res));
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {testAPI}
        </p>
      </header>
    </div>
  );
}

export default App;
