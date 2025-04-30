const Blog = require("../models/Blog");

// Create Blog
exports.createBlog = async (req, res) => {
  const { title, content, tags, category } = req.body;
  try {
    const blog = new Blog({ title, content, tags, category });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to create blog", error: err.message });
  }
};

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs", error: err.message });
  }
};

// Get Blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog", error: err.message });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update blog", error: err.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog", error: err.message });
  }
};
