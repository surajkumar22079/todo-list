import React, { useState, useEffect } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

let id = sessionStorage.getItem("id");
let token = sessionStorage.getItem("accessToken");

let toUpdateArray = [];

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Todo = () => {
  const [Inputs, setInputs] = useState({
    title: "",
    description: "",
    deadline: "",
    type: "",
    isCompleted: false,
  });
  const [Array, setArray] = useState([]); 
  const [addCounter, setAddCounter] = useState(0);
  const [typeFilter, setFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  

  const show = () => {
    document.getElementById("textarea").style.display = "block";
    document.getElementById("deadline").style.display = "block";
    document.getElementById("type").style.display = "block";
    document.getElementById("labelDealineDiv").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (
      Inputs.title === "" ||
      Inputs.description === "" ||
      Inputs.deadline === ""
    ) {
      toast.error("Title or Body or Deadline should not be empty");
    } else {
      if (id) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        await axios
          .post(
            "http://localhost:8000/api/todos/todo",
            {
              title: Inputs.title,
              description: Inputs.description,
              deadline: Inputs.deadline,
              type: Inputs.type,
              isCompleted: Inputs.isCompleted,
              userId: id,
            },
            config
          )
          .then((response) => { 
            setAddCounter(addCounter + 1); // Update addCounter
          });
        setInputs({
          title: "",
          description: "",
          deadline: getCurrentDate(),
          type: "Personal",
          isCompleted: false,
        });
        toast.success("Your task is added!");
      } else {
        setArray([...Array, Inputs]);
        setInputs({
          title: "",
          description: "",
          deadline: getCurrentDate(),
          type: "Personal",
          isCompleted: false,
        });
      }
    }
  };

  const del = async (Cardid) => {
    if (!id || !token) {
      toast.error("Please Sign Up first!");
      return;
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      data: { id: id },
    };

    try {
      await axios.delete(
        `http://localhost:8000/api/todos/todo/${Cardid}`,
        config
      );
      toast.success("Your task has been deleted successfully!");
      setAddCounter(addCounter + 1); // Update addCounter
    } catch (error) {
      console.error("There was an error deleting the task!", error);
      toast.error(
        "An error occurred while deleting the task. Please try again."
      );
    }
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  const update = (value) => {
    toUpdateArray = Array[value];
    setAddCounter(addCounter + 1);
  };

  const addcounterfunc = () => {
    setAddCounter(addCounter + 1);
  };

  const fetchTodos = async () => {
    if (id) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .get(`http://localhost:8000/api/todos/todo/${id}`, config)
        .then((response) => {
          if(response.data.todo)
          {setArray(response.data.todo);}
        });
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [addCounter]); // Run useEffect when addCounter changes

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };
 
  let filteredArray;
  if(Array){ 
     filteredArray = Array.filter((item) => {
      return (
        (typeFilter === "All" || item.type === typeFilter) &&
        (statusFilter === "All" || item.isCompleted.toString() === statusFilter)
      );
    });
  }

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column todo-inputs-div w-100 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              name="title"
              value={Inputs.title}
              onClick={show}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="description"
              value={Inputs.description}
              onChange={change}
              className="p-2 todo-inputs"
              name="description"
            />
            <div className="d-flex justify-content-between align-items-center">
              <label
                htmlFor="deadline"
                className="my-2 p-2 "
                id="labelDealineDiv"
              >
                <p className="labelDeadline">Due Date :</p>
              </label>
              <input
                type="date"
                placeholder="Deadline to finish the work"
                className="my-2 p-2 todo-inputs"
                name="deadline"
                value={Inputs.deadline}
                onChange={change}
                id="deadline"
              />
            </div>
            <select
              className="my-2 p-2 todo-inputs"
              type="text"
              name="type"
              id="type"
              value={Inputs.type}
              placeholder="Type of task"
              onChange={change}
            >
              <option value="" disabled className="todo-inputs">
                Select type of task
              </option>
              <option value="Personal" className="todo-inputs">
                Personal
              </option>
              <option value="Official" className="todo-inputs">
                Official
              </option>
              <option value="Hobby" className="todo-inputs">
                Hobby
              </option>
            </select>
          </div>
          <div className="w-lg-50 w-100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="all-todos">
          <div className="filter-block d-flex w-50 justify-content-center align-items-center mx-auto my-4">
            <div className="filter-by-type d-flex">
              <p className="filter-text">Filter by Type : &nbsp;</p>
              <select
                name="filter-by-type"
                id="filter-by-type"
                onChange={handleFilterChange}
                className="filter-by-type-select"
              >
                <option value="All" className="filter-option">
                  All
                </option>
                <option value="Official" className="filter-option">
                  Official
                </option>
                <option value="Hobby" className="filter-option">
                  Hobby
                </option>
                <option value="Personal" className="filter-option">
                  Personal
                </option>
              </select>
            </div>
            <div className="filter-by-status d-flex">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <p>Filter by Status :&nbsp;&nbsp;</p>
              <select
                name="filter-by-status"
                className="filter-by-status-select"
                id="filter-by-status"
                onChange={handleStatusFilterChange}
              >
                <option value="All" className="filter-option">
                  All
                </option>
                <option value="true" className="filter-option">
                  Completed
                </option>
                <option value="false" className="filter-option">
                  Incomplete
                </option>
              </select>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              {filteredArray &&
                filteredArray.map((item, index) => (
                  <div
                    className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                    key={index}
                  >
                    <TodoCards
                      title={item.title}
                      description={item.description}
                      type={item.type}
                      isCompleted={item.isCompleted}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateId={index}
                      toBeUpdated={update}
                      deadline={new Date(item.deadline)}
                      addcounterfunc={addcounterfunc}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update
            display={dis}
            update={toUpdateArray}
            addcounterfunc={addcounterfunc}
          />
        </div>
      </div>
    </>
  );
};

export default Todo;
