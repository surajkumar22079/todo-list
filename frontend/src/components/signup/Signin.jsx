import React, { useState } from "react";
import "./Signup.css";
import HeadComp from "./HeadComp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { toast } from "react-toastify";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
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
      const response = await axios.post("http://localhost:8000/api/access-tokens", Inputs);
      sessionStorage.setItem("id", response.data.others._id);
      sessionStorage.setItem("accessToken", response.data.accessToken); // Store the access token
      dispatch(authActions.login());
      history("/");
    } catch (error) {
       toast.error("Invalid Credentials!!")
    }
  };
  return (
    <div className="signup">
      <div className="container">
        <div className="row">
        <div className="col-lg-4 column col-left d-lg-flex justify-content-center align-items-center d-lg-block d-none">
            <HeadComp First="Sign" Second="In" />
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={Inputs.email}
                onChange={change}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={Inputs.password}
                onChange={change}
              />
              <button className="btn-signup p-2" onClick={submit}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
