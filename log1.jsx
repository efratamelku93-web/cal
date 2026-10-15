import React, { useState } from "react";
import "./log1.css";
const Log1 = () => {
  // store username & password
  const [data, setData] = useState({
    username: "",
    password: ""
  });
  // handle input change
  const handleChange = (e) => {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  // login function
  const login = (e) => {
    e.preventDefault(); // stop page refresh
    console.log(data);  // check values
  };
return (
    <div className="log1">
      <form>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button onClick={login}>Login</button>
      </form>
    </div>
  );
};
export default Log1;