const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 1. IMPORT THE MODEL
const Task = require("./models/Task");

const app = express();

// 2. ROBUST CORS & MIDDLEWARE
// Explicitly handles preflight and origin issues for the Vite frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// 3. DATABASE CONNECTION
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => console.log("✅ SUCCESS: Connected to MongoDB Atlas Cluster!"))
  .catch((err) => {
    console.error("❌ CONNECTION ERROR:", err.message);
  });

// 4. API ROUTES

// GET: Fetch all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST: Create a new task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, status } = req.body;
    const newTask = new Task({ title, status });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: "Failed to create task" });
  }
});

// PUT: Update task status (Used for Drag and Drop)
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: "Failed to update task" });
  }
});

// DELETE: Remove a specific task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete task" });
  }
});

// DELETE ALL: Clear the entire board
app.delete("/api/tasks", async (req, res) => {
  try {
    await Task.deleteMany({});
    res.json({ message: "All tasks cleared successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear board" });
  }
});

// Health check route
app.get("/", (req, res) => {
  res.send("Kanban API is alive and connected.");
});

// 5. START SERVER (Port 5001 avoids Mac AirPlay conflicts)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
