import React, { useState } from "react";
import "./Signup.css";
import HeadComp from "./HeadComp";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [Inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (
        Inputs.firstName === "" ||
        Inputs.lastName === "" ||
        Inputs.email === "" ||
        Inputs.password === ""
      ) {
        toast.error("Please fill all the fields");
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/users/register",
          Inputs
        );
        if (response.data.message === "User Already Registered") {
          toast.error("User Already Registered");
        } else {
          toast.success("User signed up successfully");
          setInputs({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
          navigate("/signin");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-3">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter your Email"
                onChange={change}
                value={Inputs.email}
              />
              <input
                className="p-2 my-3 input-signup"
                type="text"
                name="firstName"
                placeholder="Enter your First Name"
                onChange={change}
                value={Inputs.firstName}
              />
              <input
                className="p-2 my-3 input-signup"
                type="text"
                name="lastName"
                placeholder="Enter your Last Name"
                onChange={change}
                value={Inputs.lastName}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter your Password"
                onChange={change}
                value={Inputs.password}
              />
              <button className="btn-signup p-2" onClick={submit}>
                Sign Up
              </button>
            </div>
          </div>
          <div className="col-lg-4 column col-left d-lg-flex justify-content-center align-items-center d-lg-block d-none">
            <HeadComp First="Sign" Second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
