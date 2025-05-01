import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import './blogDetail.css';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    API.get(`/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Blog not found:", err));
  }, [id]);

  if (!blog) return <p className="BlogDetail-loading">Loading blog...</p>;

  return (
    <div className="BlogDetail-container">
      {blog.image && (
        <div className="BlogDetail-cover">
          <img src={blog.image} alt="cover" />
        </div>
      )}
      <h1 className="BlogDetail-title">{blog.title}</h1>
      <div className="BlogDetail-meta">
        <span className="BlogDetail-category">{blog.category}</span>
        <span className="BlogDetail-tags">{blog.tags?.join(", ")}</span>
      </div>
      <div
        className="BlogDetail-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
