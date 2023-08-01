import React, { useState } from "react";
import "../styles.css";
import RegisterUser from "../components/RegisterUser";


function Registration() {
  const [userDetails, setUserDetails] = useState([]);
  
  const handleRegistration = (userData) => {
    const newUserDetails = [
      ...userDetails,
      { userData }
    ];
    
    setUserDetails(newUserDetails);
  };
  
  return (
    <RegisterUser onRegister={handleRegistration}/>
    )
}

export default Registration;
