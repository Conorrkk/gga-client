import UserLogin from "../components/UserLogin";
import { useState } from "react";
import Footer from "../components/Footer";

function Login() {
  const [loginDetails, setLoginDetails] = useState([]);

  const handleLogin = (loginData) => {
    const newLoginDetails = [...loginDetails, { loginData }];

    setLoginDetails(newLoginDetails);
  };

  return (
    <div>
      <UserLogin onLogin={handleLogin} />
      <Footer />
    </div>
  );
}

export default Login;
