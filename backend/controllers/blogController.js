// controllers/blogController.js
const Blog = require("../models/Blog");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs"); // ✅ For deleting local file after upload

// Create Blog
exports.createBlog = async (req, res) => {
  const { title, content, tags, category, image } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const blog = new Blog({
      title,
      content,
      tags,
      category,
      image,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ message: "Failed to create blog", error: err.message });
  }
};

// ✅ Image upload handler (Cloudinary)
exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  try {
    const filePath = req.file.path;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "blog_images", // Optional: Cloudinary folder name
    });

    // ✅ Delete local file after upload
    fs.unlinkSync(filePath);

    console.log("Image uploaded to Cloudinary:", result.secure_url);
    res.status(200).json({ imageUrl: result.secure_url });
  } catch (err) {
    console.error("Error uploading image to Cloudinary:", err);
    res.status(500).json({ message: "Image upload failed", error: err.message });
  }
};

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
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
    console.error("Error fetching blog by ID:", err);
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
    console.error("Error updating blog:", err);
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
    console.error("Error deleting blog:", err);
    res.status(500).json({ message: "Failed to delete blog", error: err.message });
  }
};
