import UserLogin from "../components/UserLogin";
import { useState } from "react";

function Login() {
  const [loginDetails, setLoginDetails] = useState([]);
  
  const handleLogin = (loginData) => {
    const newLoginDetails = [
      ...loginDetails,
      { loginData }
    ];
    
    setLoginDetails(newLoginDetails);
  };
  
  return (
    <UserLogin onLogin={handleLogin}/>
  );
}

export default Login;
