const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String, // HTML from Quill editor
      required: true,
    },
    tags: [String],
    category: String,
    author: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
