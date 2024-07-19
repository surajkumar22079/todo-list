import Todo from "../models/todo-db.js";
import User from "../models/user-db.js";

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
    res.status(400).json(error);
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
      return res.status(404).json({});
    } 
    const taskToBeDeleted = await Todo.findOneAndDelete({
      _id: todoId,
    });

    const userToBeUpdated = await User.findByIdAndUpdate(user.id, {
      $pull: {
        todo: todoId,
      },
    }).then(()=>res.json());
  } catch (error) {
    res.status(500).json({error});
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
    todo.save().then(() => res.status(200).json(todo));
  } catch (error) { 
    res.status(500);
  }
};

//getTasks
export const getTasks = async (req, res) => {
  try {
    const todo = await Todo.find({ userId: req.params.id }); 
    if (todo.length !== 0) {
     return res.status(200).json({ todo: todo });
    } else {
     return res.status(200).json({});
    }
  } catch (error) {
   return res.status(500);
  }
};


//toggle Completed or not
export const toggleCompleteStatus = async (req, res) => {
  try { 
    
    const todoId = req.params.id;
    // Find the todo to get the current isCompleted state
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({});
    }

    // Toggle the isCompleted state
    todo.isCompleted = !todo.isCompleted;

    // Save the updated todo
    await todo.save();

    return res.status(200).json({ todo });
  } catch (error) { 
    return res.status(500);
  }
};
