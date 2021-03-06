import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route } from 'react-router-dom';
import Brands from './Brands';
import Home from './Home';
import Types from "./Types";
import GuitarForm from './GuitarForm';
import GuitarDetail from './GuitarDetail';
import GuitarDelete from "./GuitarDelete";
import ItemForm from "./ItemForm";


function AllContent(props) {
  const [openDrawer, toggleDrawer] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [guitarList, setGuitarList] = useState(null);
  const [clickedTab, setClickedTab] = useState('all');

  const drawerRef = useRef(null);

  const { clickedAll, clickedBrands, clickedTypes, navigate } = props; 

  const dummyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Jx3nFfYJbtte3rifrRM2fN8zbrJvZUtYug&usqp=CAU";

  //Load list 
  useEffect(() => {
    getGuitarList(); 
  }, [])

  useEffect(() => {
    if (window.location.href.endsWith('/')) {
      setClickedTab('all');
    }
    else if(window.location.href.endsWith('/brands')) {
      setClickedTab('brands');
    }
    else if(window.location.href.endsWith('/types')) {
      setClickedTab('types');
    }
  });

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
      .then(res => setGuitarList(res))
  }

  useEffect(() => {
    /* Close the drawer when the user clicks outside of it */
    const closeDrawer = event => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }

      toggleDrawer(false);
    };

    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);

  return (
    <Styles.Wrapper className="main">
      <CSSReset />

      <Navbar.Wrapper>
        <Navbar.Logo>Guitar Inventory</Navbar.Logo>

        <HamburgerButton.Wrapper onClick={() => toggleDrawer(true)}>
          <HamburgerButton.Lines />
        </HamburgerButton.Wrapper>

        <Navbar.Items ref={drawerRef} openDrawer={openDrawer}>
          <Navbar.Item 
            style={clickedTab==='all' ? {textDecoration: 'underline', fontWeight: 'bold'} : null} 
            onClick={clickedAll}>All</Navbar.Item>
          <Navbar.Item 
            style={clickedTab==='brands' ? {textDecoration: 'underline', fontWeight: 'bold'} : null} 
            onClick={clickedBrands}>Brands</Navbar.Item>
          <Navbar.Item 
            style={clickedTab==='types' ? {textDecoration: 'underline', fontWeight: 'bold'} : null} 
            onClick={clickedTypes}>Types</Navbar.Item>
        </Navbar.Items>
      </Navbar.Wrapper>
      <Routes>
        <Route
          path="/"
          element={<Home 
            navigate={navigate}
            dummyImage={dummyImage}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            guitarList={guitarList}
            setGuitarList={setGuitarList}
            getGuitarList={getGuitarList}
            />}
        />
        <Route
          path="/guitar/:id"
          element={<GuitarDetail
            navigate={navigate}
            dummyImage={dummyImage}
            />}
        />
        <Route
          path="/guitar/:id/delete"
          element={<GuitarDelete
            navigate={navigate}
            dummyImage={dummyImage}
            />}
        />
        <Route
          path="/guitar/:id/update"
          element={<GuitarForm
            navigate={navigate}
            dummyImage={dummyImage}
            />}
        />
        <Route
          path="/create"
          element={<GuitarForm 
            navigate={navigate}
            />}
        />
        <Route
          path="/brand/create"
          element={<ItemForm 
            navigate={navigate}
            clickedTab={clickedTab}
            />}
        />
        <Route
          path="/brands"
          element={<Brands 
            navigate={navigate}
            setSelectedBrand={setSelectedBrand}
            resetType={setSelectedType}
            getGuitarList={getGuitarList}
            guitarList={guitarList}
            clickedTab={clickedTab}
            />}
        />
        <Route
          path="/types"
          element={<Types 
            navigate={navigate}
            resetBrand={setSelectedBrand}
            setSelectedType={setSelectedType}
            getGuitarList={getGuitarList}
            guitarList={guitarList}
            clickedTab={clickedTab}
            />}
        />
        <Route
          path="/type/create"
          element={<ItemForm 
            navigate={navigate}
            clickedTab={clickedTab}
            />}
        />
      </Routes>
    </Styles.Wrapper>
  );
}

const Styles = {
  Wrapper: styled.main`
    display: flex;
    flex-direction: column;
    background-color: #eeeeee;
    min-height: 100vh;
  `
};

const Navbar = {
  Wrapper: styled.nav`
    flex: 1;

    align-self: flex-start;

    padding: 1rem 3rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: white;

    box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px;

    width: 100%;
    max-height: 7rem;

    // 40em == 640px
    @media only screen and (max-width: 40em) {
      position: fixed;
      width: 100vw;
      bottom: 0;
    }
  `,
  Logo: styled.h1`
    border: 1px solid gray;
    padding: 0.5rem 1rem;
  `,
  Items: styled.ul`
    display: flex;
    list-style: none;

    @media only screen and (max-width: 40em) {
      position: fixed;
      right: 0;
      top: 0;

      height: 100%;

      flex-direction: column;

      box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 8px;
      background-color: white;
      padding: 1rem 2rem;

      transition: 0.2s ease-out;

      transform: ${({ openDrawer }) =>
        openDrawer ? `translateX(0)` : `translateX(100%)`};
    }
  `,
  Item: styled.li`
    padding: 0 1rem;
    cursor: pointer;

    @media only screen and (max-width: 40em) {
      padding: 1rem 0;
    }
  `
};

const HamburgerButton = {
  Wrapper: styled.button`
    height: 3rem;
    width: 3rem;
    position: relative;
    font-size: 12px;

    display: none;

    @media only screen and (max-width: 40em) {
      display: block;
    }

    /* Remove default button styles */
    border: none;
    background: transparent;
    outline: none;

    cursor: pointer;
    

    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 150%;
      width: 150%;
      top: -25%;
      left: -25%;
    }
  `,
  Lines: styled.div`
    top: 50%;
    margin-top: -0.125em;

    &,
    &:after,
    &:before {
      /* Create lines */
      height: 2px;
      pointer-events: none;
      display: block;
      content: "";
      width: 100%;
      background-color: black;
      position: absolute;
    }

    &:after {
      /* Move bottom line below center line */
      top: -0.8rem;
    }

    &:before {
      /* Move top line on top of center line */
      top: 0.8rem;
    }
  `
};

const CSSReset = createGlobalStyle`
  *,
  *::before, 
  *::after {
    margin: 0; 
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; /*1rem = 10px*/
    box-sizing: border-box;      
  }  

  body {
    font-size: 1.4rem;
    font-family: sans-serif;
  }
`;

export default AllContent;
