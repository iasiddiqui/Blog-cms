// routes/blogRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // temporary local storage

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  uploadImage,
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Admin Routes
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

router.post("/upload-image", authMiddleware, upload.single("image"), uploadImage);

module.exports = router;
