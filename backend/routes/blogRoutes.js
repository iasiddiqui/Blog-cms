const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Admin Routes
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
