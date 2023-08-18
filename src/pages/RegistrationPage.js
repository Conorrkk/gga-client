import React, { useState } from "react";
import "../styles.css";
import RegisterUser from "../components/RegisterUser";
import Footer from "../components/Footer";

function Registration() {
  const [userDetails, setUserDetails] = useState([]);

  const handleRegistration = (userData) => {
    const newUserDetails = [...userDetails, { userData }];

    setUserDetails(newUserDetails);
  };

  return (
    <div>
      <RegisterUser onRegister={handleRegistration} />
      <Footer />
    </div>
  );
}

export default Registration;
