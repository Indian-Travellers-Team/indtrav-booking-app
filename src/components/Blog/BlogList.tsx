import React, { useEffect, useState } from 'react';
import { fetchBlogList } from '../../api/blogListService';
import type { Blog } from '../../types/blogTypes';
import { Container } from 'react-bootstrap';
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
    <div className="mountain-blog-wrapper">
      {/* Mountain silhouette header overlay */}
      <div className="mountain-header-overlay">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          className="mountain-svg"
        >
          <path d="M0,0 L0,120 L1200,120 L1200,0 L1110,60 L1020,0 L930,60 L840,0 L750,60 L660,0 L570,60 L480,0 L390,60 L300,0 L210,60 L120,0 L30,60 L0,0 Z"></path>
        </svg>
      </div>

      <Container>
        <div className="blog-container">
          {/* Blog List Section */}
          <div className="blog-list-section">
            <div className="section-header">
              <h2 className="mountain-title">
                <span className="mountain-title-inner">Article Gallery</span>
              </h2>
              <div className="mountain-divider">
                <div className="mountain-peak"></div>
              </div>
            </div>
            <p className="blog-subtitle">
              Explore Insights and Stories 📚 from Our Journey
            </p>

            {loading ? (
              <div className="mountain-loading">
                <div className="mountain-shape"></div>
                <div className="loading-text">Loading mountain stories...</div>
              </div>
            ) : blogs.length > 0 ? (
              <ul className="blog-list">
                {blogs.map((blog) => (
                  <li key={blog.id} className="mountain-blog-card">
                    <div className="blog-image-container">
                      <img
                        src={`${blog.first_image_url}`}
                        alt={blog.title}
                        className="blog-img"
                      />
                      <div className="mountain-overlay"></div>
                    </div>
                    <div className="mountain-blog-details">
                      <h3 className="mountain-blog-title">{blog.title}</h3>
                      <div className="blog-meta">
                        <span className="blog-author">By {blog.author}</span>
                        <span className="blog-reads">
                          {blog.reads_min} min read
                        </span>
                      </div>
                      <a
                        href={`/blogs/${blog.slug}`}
                        className="mountain-read-more"
                      >
                        Read More
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-blogs-message">
                No blogs available at the moment.
              </p>
            )}
          </div>

          {/* Featured Packages Section */}
          <div className="featured-packages-section">
            <FeaturedPackages />
          </div>
        </div>
      </Container>

      {/* Mountain-themed footer overlay */}
      <div className="mountain-footer-overlay">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          className="mountain-svg"
        >
          <path d="M0,0 L0,120 L1200,120 L1200,0 L1110,60 L1020,0 L930,60 L840,0 L750,60 L660,0 L570,60 L480,0 L390,60 L300,0 L210,60 L120,0 L30,60 L0,0 Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default BlogList;
