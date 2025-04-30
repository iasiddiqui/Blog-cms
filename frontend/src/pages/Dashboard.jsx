import { useEffect, useState } from "react";
import API from "../api/api";
import Editor from "../components/Editor";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", tags: "", category: "" });
  const [editingId, setEditingId] = useState(null);

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

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Editor
          value={form.content}
          onChange={(value) => setForm({ ...form, content: value })}
        />
        <input
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <button type="submit">{editingId ? "Update" : "Add"} Blog</button>
      </form>

      <hr />
      <h3>All Blogs</h3>
      {blogs.map((blog) => (
        <div key={blog._id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
          <h4>{blog.title}</h4>
          <button onClick={() => handleEdit(blog)}>Edit</button>
          <button onClick={() => handleDelete(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
