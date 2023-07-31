import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    let result = await fetch(`${BASE_URL}/login`, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));

      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="appButton" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
