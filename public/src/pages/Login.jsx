import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/register", {
        ...values,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Login Account</h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
