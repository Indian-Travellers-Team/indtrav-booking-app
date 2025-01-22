import React, { useEffect, useState } from 'react';
import { fetchBlogList } from '../../api/blogListService';
import type { Blog } from '../../types/blogTypes';
import { Container, Row } from 'react-bootstrap';
import FeaturedPackages from '../Package/FeaturedPackages';
import './styles/BlogList.css';

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBlogList();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <div className="blog-container">
        {/* Blog List Section */}
        <div className="blog-list-section">
          <h2 className="title-with-underline">Article Gallery</h2>
          <p>Explore Insights and Stories 📚 from Our Journey</p>
          {loading ? (
            <div>Loading Blogs...</div>
          ) : blogs.length > 0 ? (
            <ul className="blog-list">
              {blogs.map((blog) => (
                <li key={blog.id} className="blog-card">
                  <div className="blog-image-wrapper">
                    <img
                      src={`http://127.0.0.1:8000${blog.first_image_url}`}
                      alt={blog.title}
                      className="blog-image"
                    />
                  </div>
                  <div className="blog-details">
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-author">By {blog.author}</p>
                    <p className="blog-reads">{blog.reads_min} min read</p>
                    <a
                      href={`/blogs/${blog.slug}`}
                      className="read-more-button"
                    >
                      Read More...
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No blogs available at the moment.</p>
          )}
        </div>
        {/* Featured Packages Section */}
        <FeaturedPackages /> {/* Use the new component here */}
      </div>
    </Container>
  );
};

export default BlogList;
