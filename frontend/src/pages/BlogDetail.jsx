import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import './blogDetail.css';  // Import CSS

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    API.get(`/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Blog not found:", err));
  }, [id]);

  if (!blog) return <p className="BlogDetail-loading">Loading...</p>;

  return (
    <div className="BlogDetail-container">
      <h1 className="BlogDetail-title">{blog.title}</h1>
      <div 
        className="BlogDetail-content" 
        dangerouslySetInnerHTML={{ __html: blog.content }} 
      />
      <div className="BlogDetail-info">
        <p><strong>Category:</strong> {blog.category}</p>
        <p><strong>Tags:</strong> {blog.tags?.join(", ")}</p>
      </div>
    </div>
  );
}
