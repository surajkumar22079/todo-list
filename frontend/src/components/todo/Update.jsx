import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
let id = sessionStorage.getItem("id");
let token = sessionStorage.getItem("accessToken");

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Update = ({ display, update  , addcounterfunc}) => {
  const [Inputs, setInputs] = useState({
    title: "",
    description: "",
    deadline: getCurrentDate(),
    type: "Personal",
    isCompleted: false,
  });

  useEffect(() => {
    if (update) {
      setInputs({
        title: update.title,
        description: update.description,
        type: update.type,
        deadline: update.deadline
          ? new Date(update.deadline).toISOString().split("T")[0]
          : getCurrentDate(),
        isCompleted: update.isCompleted,
      });
    }
  }, [update]);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (id) {
      const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
      const updatedTask = {
        ...Inputs,
        deadline: new Date(Inputs.deadline),
      };

      try {
        await axios.put(
          `http://localhost:8000/api/todos/todo/${update._id}`,
          updatedTask,
          config
        );
        toast.success("Your task has been updated!");
        addcounterfunc();
        display("none");
      } catch (error) {
        toast.error("Failed to update the task.");
      }
    }
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h3>Update Your Task</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        value={Inputs.title}
        name="title"
        onChange={change}
      />
      <textarea
        className="todo-inputs w-100 p-3"
        value={Inputs.description}
        name="description"
        onChange={change}
      />
      <input
        type="date"
        className="todo-inputs my-4 w-100 p-3"
        value={Inputs.deadline}
        name="deadline"
        onChange={change}
      />
      <select 
        value={Inputs.type}
        name="type"
        onChange={change}
        className="update-type todo-inputs my-4 w-100 p-3"
      >
        <option value="Official">Official</option>
        <option value="Personal">Personal</option>
        <option value="Hobby">Hobby</option>
      </select>

      <div>
        <button className="btn btn-dark my-4 mx-3" onClick={submit}>
          Update
        </button>
        <button
          className="btn btn-danger my-4 mx-3"
          onClick={() => display("none")}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
