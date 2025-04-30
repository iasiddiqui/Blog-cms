import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    API.get(`/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Blog not found:", err));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      <p><strong>Category:</strong> {blog.category}</p>
      <p><strong>Tags:</strong> {blog.tags?.join(", ")}</p>
    </div>
  );
}
