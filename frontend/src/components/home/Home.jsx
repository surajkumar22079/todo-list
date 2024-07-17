import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
const id = sessionStorage.getItem("id");

const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">
        Easily manage <br /> your daily tasks !
        </h1>
        <p>
        Stay organized and boost productivity <br /> with your personalized task manager...!{" "}
        </p>
        <Link to={id?"/todo":"/signin"}>
        <button className="home-btn p-2" >Make Todo list</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
