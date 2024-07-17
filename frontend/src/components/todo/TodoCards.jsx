import React from "react";
import "./Todo.css";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";
import axios from "axios";
let userId = sessionStorage.getItem("id");
let token = sessionStorage.getItem("accessToken");

const TodoCards = ({
  title,
  description,
  type,
  isCompleted,
  id,
  delid,
  display,
  updateId,
  toBeUpdated,
  deadline,
  addcounterfunc,
}) => {
  const toggleCompletedStatus = async (cardId) => {
    if (userId) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.patch(
          `http://localhost:8000/api/todos/todo/${cardId}`,
          { isCompleted: !isCompleted },
          config
        );
        addcounterfunc();
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };
  return (
    <div className="p-4 todo-card">
      <div>
        <h4 className="d-flex justify-content-center">{title}</h4>
        <p className="todo-card-p d-flex justify-content-center mb-4">{description.split("", 100)}...</p>
        <div className="d-flex">

        <h6>
          <b>Due date : </b>
        </h6> 
        &nbsp;  &nbsp;
        <p>{deadline.toDateString()}</p>
        </div>
        <div className="d-flex">
          <p><b>Type :</b></p>
          &nbsp; &nbsp; 
          <p>{type}</p>
          </div>
        <div className="d-flex justify-content-between">
          <p><b>Task completed : </b></p>
          <label className="switch">
            <input
              type="checkbox"
              onChange={() => toggleCompletedStatus(id)}
              checked={isCompleted}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <br />

      <div className="d-flex justify-content-around ">
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
          onClick={() => {
            toBeUpdated(updateId);
            display("block");
          }}
        >
          <GrDocumentUpdate className=" card-icons" /> Update
        </div>
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
          onClick={() => {
            delid(id);
          }}
        >
          <AiFillDelete className="card-icons del" /> Delete
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
