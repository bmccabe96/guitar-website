import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Types = () => {

  const [typeList, setTypeList] = useState();

  //Load list 
  useEffect(() => {
    getTypeList();
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


  return (
    <p>TESTING TYPES ROUTE</p>
  )
}

export default Types;