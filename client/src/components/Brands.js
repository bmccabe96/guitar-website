import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Brands = () => {

  const [brandList, setBrandList] = useState();

  //Load list 
  useEffect(() => {
    getBrandList();
  }, [])

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


  return (
    <p>TESTING BRANDS ROUTE</p>
  )
}

export default Brands;