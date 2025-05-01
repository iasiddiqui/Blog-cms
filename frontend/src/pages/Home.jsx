import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import API from "../api/api";
import { Link } from "react-router-dom";
import './home.css';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hasMore, setHasMore] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(5);
  const { ref, inView } = useInView();

  useEffect(() => {
    API.get("/blogs")
      .then((res) => {
        const allBlogs = Array.isArray(res.data) ? res.data : res.data.blogs || [];
        setBlogs(allBlogs);
        setDisplayedBlogs(allBlogs.slice(0, itemsToShow));
        if (allBlogs.length <= itemsToShow) {
          setHasMore(false);
        }
      })
      .catch((err) => console.error("Failed to load blogs:", err));
  }, []);

  // Load more blogs when the sentinel comes into view
  useEffect(() => {
    if (inView && hasMore) {
      const newItemsToShow = itemsToShow + 5;
      const newDisplayed = blogs.slice(0, newItemsToShow);
      setDisplayedBlogs(newDisplayed);
      setItemsToShow(newItemsToShow);
      if (newDisplayed.length >= blogs.length) {
        setHasMore(false);
      }
    }
  }, [inView, hasMore, itemsToShow, blogs]);

  const categories = ["All", ...new Set(blogs.map((blog) => blog.category).filter(Boolean))];

  const filteredBlogs = selectedCategory === "All"
    ? displayedBlogs
    : displayedBlogs.filter((blog) => blog.category === selectedCategory);

  const getExcerpt = (content) => {
    const text = content.replace(/<[^>]+>/g, '');
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
  };

  return (
    <div className="home-container">
      <h1>Latest Blogs...</h1>

      <div className="category-filter">
        <label htmlFor="category-select">Filter by Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="home-blog-cards">
        {filteredBlogs.length ? (
          filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              className="home-blog-card"
              initial={{ opacity: 0, y: -300 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              {blog.image && (
                <img src={blog.image} alt={blog.title} className="home-blog-image" />
              )}
              <div className="home-blog-header">
                <Link to={`/blog/${blog._id}`} className="home-blog-title">
                  {blog.title}
                </Link>
              </div>
              <div className="home-blog-content">
                {getExcerpt(blog.content)}
                <Link to={`/blog/${blog._id}`}>Read More</Link>
              </div>
              <div className="home-blog-footer">
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="home-no-blogs">No blogs found.</p>
        )}

        {/* 👇 Sentinel for loading more */}
        {hasMore && <div ref={ref} className="loading-sentinel">Loading more blogs...</div>}
      </div>
    </div>
  );
}
