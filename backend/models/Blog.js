// models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [String],
    category: String,
    author: {
      type: String,
      default: "Admin",
    },
    image: {
      type: String, // URL of the uploaded image from Cloudinary
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
