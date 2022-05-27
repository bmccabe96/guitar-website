import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route } from 'react-router-dom';
import Brands from './Brands';
import Home from './Home';
import Types from "./Types";
import AddGuitar from './AddGuitar';
import GuitarDetail from './GuitarDetail';


function AllContent(props) {
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);

  const { clickedAll, clickedBrands, clickedTypes, navigate } = props; 


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
        <Navbar.Logo>Logo</Navbar.Logo>

        <HamburgerButton.Wrapper onClick={() => toggleDrawer(true)}>
          <HamburgerButton.Lines />
        </HamburgerButton.Wrapper>

        <Navbar.Items ref={drawerRef} openDrawer={openDrawer}>
          <Navbar.Item onClick={clickedAll}>All</Navbar.Item>
          <Navbar.Item onClick={clickedBrands}>By Brand</Navbar.Item>
          <Navbar.Item onClick={clickedTypes}>By Type</Navbar.Item>
        </Navbar.Items>
      </Navbar.Wrapper>
      <Routes>
        <Route
          path="/"
          element={<Home 
            navigate={navigate}
            />}
        />
        <Route
          path="/guitar/:id"
          element={<GuitarDetail 
            navigate={navigate}
            />}
        />
        <Route
          path="/create"
          element={<AddGuitar 
            navigate={navigate}
            />}
        />
        <Route
          path="/brands"
          element={<Brands 
            navigate={navigate}
            />}
        />
        <Route
          path="/types"
          element={<Types 
            navigate={navigate}
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
