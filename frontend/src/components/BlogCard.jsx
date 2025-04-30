import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      <h2>{blog.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) + "..." }} />
      <Link to={`/blog/${blog._id}`}>Read more</Link>
    </div>
  );
}
