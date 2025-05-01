import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Editor from "../components/Editor";
import './Dashboard.css';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", tags: "", category: "", image: null });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch all blogs
  const fetchBlogs = () =>
    API.get("/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle form submission for adding/editing blogs
  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Form validation
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.content.trim()) newErrors.content = "Content is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!editingId && !form.image) newErrors.image = "Image is required";

    // If there are any errors, update state and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const blogData = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()),
    };

    // Upload image if provided
    if (form.image) {
      const imageUrl = await handleImageUpload(form.image);
      if (imageUrl) {
        blogData.image = imageUrl;
      } else {
        setErrors((prev) => ({ ...prev, image: "Image upload failed. Please try again." }));
        return;
      }
    }

    try {
      if (editingId) {
        await API.put(`/blogs/${editingId}`, blogData);
        setEditingId(null);
      } else {
        await API.post("/blogs", blogData);
      }
      setForm({ title: "", content: "", tags: "", category: "", image: null });
      setErrors({});
      setShowModal(false);
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
      setErrors((prev) => ({ ...prev, general: "Failed to save blog. Please try again." }));
    }
  };

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await API.post("/blogs/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.imageUrl; // Return the Cloudinary image URL
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };

  // Handle editing an existing blog
  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      content: blog.content,
      tags: blog.tags.join(", "),
      category: blog.category,
      image: null, // clear the image field when editing
    });
    setEditingId(blog._id);
    setShowModal(true);
  };

  // Handle deleting a blog
  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await API.delete(`/blogs/${id}`);
      fetchBlogs();
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Admin Dashboard</h2>

      <div className="dashboard-actions">
        <button
          onClick={() => {
            setForm({ title: "", content: "", tags: "", category: "", image: null });
            setEditingId(null);
            setShowModal(true);
          }}
          className="write-blog-button"
        >
          Write Blog
        </button>

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <hr className="dashboard-separator" />

      <h3 className="dashboard-subheading">All Blogs</h3>
      <div className="dashboard-blog-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="dashboard-blog-card">
            <h4 className="dashboard-blog-title">{blog.title}</h4>
            <div className="dashboard-blog-actions">
              <button onClick={() => handleEdit(blog)} className="dashboard-edit-button">Edit</button>
              <button onClick={() => handleDelete(blog._id)} className="dashboard-delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Blog */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={() => setShowModal(false)}>×</button>
            <h3>{editingId ? "Edit Blog" : "Add New Blog"}</h3>
            {errors.general && <p className="error-message">{errors.general}</p>}
            <form onSubmit={handleSubmit} className="dashboard-form">
              <div className="input-group">
                <input
                  className="dashboard-input"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                {errors.title && <p className="error-message">{errors.title}</p>}
              </div>
              
              <div className="input-group">
                <Editor
                  value={form.content}
                  onChange={(value) => setForm({ ...form, content: value })}
                />
                {errors.content && <p className="error-message">{errors.content}</p>}
              </div>
              
              <div className="input-group">
                <input
                  className="dashboard-input"
                  placeholder="Tags (comma-separated)"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </div>
              
              <div className="input-group">
                <input
                  className="dashboard-input"
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
                {errors.category && <p className="error-message">{errors.category}</p>}
              </div>
              
              <div className="input-group">
                <input
                  type="file"
                  className="dashboard-input"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                />
                {errors.image && <p className="error-message">{errors.image}</p>}
              </div>

              <button type="submit" className="dashboard-submit-button">
                {editingId ? "Update" : "Add"} Blog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
