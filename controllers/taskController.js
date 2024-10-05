const Task = require("../models/Task");
const { taskSchema } = require("../validators/validate");
const asyncHandler = require("../utils/asyncHandler");
const validateData = require("../utils/validateData");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  return res
    .status(200)
    .json({ message: "Tasks retrieved successfully", tasks });
});

const createTask = asyncHandler(async (req, res) => {
  const { valid, errors } = validateData(taskSchema, req.body);

  if (!valid) {
    return res.status(400).json({ message: errors });
  }

  const task = new Task({ ...req.body, userId: req.user._id });
  await task.save();
  return res.status(201).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  const { valid, errors } = validateData(taskSchema, req.body);

  if (!valid) {
    return res.status(400).json({ message: errors });
  }

  const task = await Task.findById(req.params.id);

  if (!task || task.userId.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updatedTask = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    userId: task.userId, // keep the original userId
  };

  await Task.findByIdAndUpdate(req.params.id, updatedTask, { new: true });
  return res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task || task.userId.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Task not found" });
  }

  returnres.status(200).json({ message: "Task removed" });
});

module.exports = { getTasks, createTask, updateTask, deleteTask };
