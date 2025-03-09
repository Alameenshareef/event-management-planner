const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: String,
    duration: Number,
    dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    isGlobal: Boolean,
})

module.exports = mongoose.model("Task", TaskSchema);