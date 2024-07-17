import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="d-flex">
          <h1>About Todo App</h1>
        </div>
        <p>
          The Todo App is designed to help individual users manage their tasks
          efficiently. With a user-friendly interface, it allows you to track
          your daily activities and stay organized.
        </p>
        <h4>Key Features</h4>
        <p>
          <strong>User Authentication:</strong> Securely log in to your account
          to access your tasks, or create a new account to start managing your
          tasks.
        </p>
        <p>
          <strong>Task Management:</strong> Easily add new tasks with a title,
          description, deadline, and type (Personal, Official, Hobby). Modify
          existing tasks, remove tasks that are no longer needed, and keep track
          of your progress by marking tasks as completed.
        </p>
        
        <h4>Get Started</h4>
        <p>
          To begin using the Todo App, sign up for an account or log in if you
          already have one. Start managing your tasks today and enhance your
          productivity!
        </p>
      </div>
    </div>
  );
};

export default About;
