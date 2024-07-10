import Task from "../models/Task.js";
import User from "../models/User.js";

// Create a new task
export const createTask = async (req, res) => {
  const { title, description, deadline } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      deadline,
      owner: req.user.id, // from auth middleware
    });

    const task = await newTask.save();
    res.json({ msg: "New task created", task });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get all tasks for the current user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id })
      .sort({ date: -1 })
      .populate("sharedWith", ["name", "username"])
      .populate("owner", ["name", "username"]);
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Toggle task completion status
export const toggleTaskCompletion = async (req, res) => {
  const taskId = req.params.id;

  try {
    let task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Ensure only the owner can toggle completion status
    if (task.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Toggle completion status
    task.completed = !task.completed;
    await task.save();
    res.json({ msg: "Task completion status changed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Update task details
export const updateTask = async (req, res) => {
  const { title, description, deadline, completed } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Update the task details
    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;
    task.completed =
      typeof completed === "boolean" ? completed : task.completed;

    await task.save();
    res.json({ msg: "Task updated", task });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Share task with users
export const shareTask = async (req, res) => {
  const { taskId, shareWithUsernames } = req.body;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Process each username in the array
    const userUpdates = await Promise.all(
      shareWithUsernames.map(async (username) => {
        const userToShareWith = await User.findOne({ username });

        if (!userToShareWith) {
          return { username, status: "User not found" };
        }

        const userId = userToShareWith._id.toString();
        if (task.sharedWith.includes(userId)) {
          // If already shared
          return { username, status: "Already shared" };
        } else {
          task.sharedWith.push(userId); // Add if not already shared
          return { username, status: "Shared" };
        }
      })
    );

    await task.save();
    res.json({ msg: `Task shared`, task, userUpdates });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get tasks shared with the current user
export const getSharedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ sharedWith: req.user.id })
      .populate("owner", ["name", "username"])
      .populate("sharedWith", ["name", "username"]);
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
