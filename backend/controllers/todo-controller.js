import Todo from "../models/todo-list.js";
import User from "../models/user.js";

//add Task
export const addTodo = async (req, res) => {
  try {
    const { title, description, deadline, type, isCompleted, userId } =
      req.body;
    const existingUser = await User.findById(userId);
    if (existingUser) {
      const todo = new Todo({
        title,
        description,
        deadline,
        type,
        isCompleted,
        userId: existingUser,
      });
      await todo.save().then(() => res.status(200).json({ todo }));
      existingUser.todo.push(todo);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
    res.send(400).json({ message: "Error in sending task data" });
  }
};

//delete Task
export const deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  const user = req.body;
  try {
    const todo = await Todo.findOne({
      _id: todoId,
    });
    const userDB = await User.findOne({
      _id: user.id,
    });

    if (!todo) {
      return res.status(401).json({ message: "No task found" });
    }
    if (!userDB) {
      return res.status(401).json({ message: "no user found" });
    }

    const taskToBeDeleted = await Todo.findOneAndDelete({
      _id: todoId,
    }).then(() => {
      res.json({message:"Task deleted successfully"});
    });

    const userToBeUpdated = await User.findByIdAndUpdate(user._id, {
      $pull: {
        todo: todoId,
      },
    }).then(()=>res.json({message:"User updated successfully"}));
  } catch (error) {
    res.status(500);
  }
};

//UpdateTask
export const updateTask = async (req, res) => {
  try {
    const { title, description, deadline, type, isCompleted } = req.body;

    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      title,
      description,
      deadline,
      type,
      isCompleted,
    });
    todo.save().then(() => res.status(200).json({ message: "Task updated" }));
  } catch (error) {
    console.log(error);
    // res.send(400).json({ message: "Error in sending task data" });
  }
};

//getTasks
export const getTasks = async (req, res) => {
  try {
    const todo = await Todo.find({ userId: req.params.id });
    if (todo.length !== 0) {
      res.status(200).json({ todo: todo });
    } else {
      res.status(404).json({ message: "No Task Found" });
    }
  } catch (error) {
    res.status(500);
  }
};
