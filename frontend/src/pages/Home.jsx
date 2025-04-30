import { useEffect, useState } from "react";
import API from "../api/api";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Failed to load blogs:", err));
  }, []);

  return (
    <>
    <div>
      {/* Link to Login Page */}
      <Link to="/login">
        <p style={{ cursor: "pointer", color: "blue" }}>Login as Admin</p>
      </Link>
      {/* <Link to="/admin">
        <p style={{ cursor: "pointer", color: "green" }}>Admin Dashboard</p>
      </Link> */}
    </div>
    <div className="container">
      <h1>Latest Blogs</h1>

      

      {/* Display blogs if available */}
      {blogs.length ? (
        blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
    </>
  );
}
