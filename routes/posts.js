const express = require("express");
const router = express.Router();
const Todo = require("../modals/TodosModal");

//GET TODOS
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: "descending" });
    res.status(200).json(todos);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//POST a TODO
router.post("/", async (req, res) => {
  const todo = new Todo({
    title: req.body.title
  });
  try {
    const savedTodo = await todo.save();
    res.status(200).json(savedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

//GET A SPECIFIC TODO
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//UPDATE a TODO
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    const updated = await Todo.updateOne(
      { _id: req.params.id },
      { $set: { completed: !todo.completed } },
      { runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE a TODO
router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
