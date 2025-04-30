import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import API from "../api/api";
import Editor from "../components/Editor";
import './Dashboard.css';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", tags: "", category: "" });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate hook

  const fetchBlogs = () =>
    API.get("/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      if (editingId) {
        await API.put(`/blogs/${editingId}`, blogData);
        setEditingId(null);
      } else {
        await API.post("/blogs", blogData);
      }
      setForm({ title: "", content: "", tags: "", category: "" });
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      content: blog.content,
      tags: blog.tags.join(", "),
      category: blog.category,
    });
    setEditingId(blog._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await API.delete(`/blogs/${id}`);
      fetchBlogs();
    }
  };

  // Logout function to clear token and navigate to login page
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Admin Dashboard</h2>

      {/* Add Logout Button */}
      <button onClick={handleLogout} className="logout-button">Logout</button>

      <form onSubmit={handleSubmit} className="dashboard-form">
        <input
          className="dashboard-input"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Editor
          value={form.content}
          onChange={(value) => setForm({ ...form, content: value })}
        />
        <input
          className="dashboard-input"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <input
          className="dashboard-input"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <button type="submit" className="dashboard-submit-button">
          {editingId ? "Update" : "Add"} Blog
        </button>
      </form>

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
    </div>
  );
}
