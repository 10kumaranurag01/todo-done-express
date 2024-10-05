const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["To Do", "In Progress", "Completed"] },
    priority: { type: String, enum: ["Low", "Medium", "High"] },
    dueDate: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Custom toJSON method to return specific fields
taskSchema.set("toJSON", {
  transform: (doc, ret) => {
    // Remove the userId field from the output
    delete ret.userId;
    return ret; // Return the modified object
  },
});

// Alternatively, if you want to return specific fields only:
taskSchema.set("toJSON", {
  transform: (doc, ret) => {
    return {
      id: ret._id,
      title: ret.title,
      description: ret.description,
      status: ret.status,
      priority: ret.priority,
      dueDate: ret.dueDate,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
});

module.exports = mongoose.model("Task", taskSchema);
