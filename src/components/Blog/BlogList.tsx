import React, { useEffect, useState } from 'react';
import { fetchBlogList } from '../../api/blogListService'; // Import the BlogList API service
import type { Blog } from '../../types/blogTypes'; // Import Blog type
import { Container, Row, Col, Button } from 'react-bootstrap';
import './styles/BlogList.css'; // Import styles for the Blog List

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]); // State to hold the list of blogs
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBlogList(); // Fetch blogs from the API
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  return (
    <Container>
      <div className="blog-container">
        {/* Blog List Section */}
        <div className="blog-list-section">
          <h2 className="title-with-underline">Article Gallery</h2>
          <p>Explore Insights and Stories 📚 from Our Journey</p>
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
                  <Button
                    href={`/blogs/${blog.slug}`}
                    variant="primary"
                    className="read-more-button"
                  >
                    Read More...
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Packages Section */}
        <div className="featured-packages-section">
          <h4 className="title-with-underline">Featured Packages</h4>
          <div className="featured-packages">
            {/* Hardcoded Featured Packages */}
            <div className="package">
              <h5>Kasol Kheerganga 3D/2N</h5>
              <p>Starting from ₹6499.00</p>
              <Button href="/packages/kasol-kheerganga-2" variant="primary">
                Check Now 🚀
              </Button>
            </div>
            <div className="package">
              <h5>Lahaul - Spiti 7D/6N</h5>
              <p>Starting from ₹17499.00</p>
              <Button href="/packages/lahaul-spiti-9" variant="primary">
                Check Now 🚀
              </Button>
            </div>
            <div className="package">
              <h5>Tirthan Jibhi Sirasar Lake 3D/2N</h5>
              <p>Starting from ₹6999.00</p>
              <Button
                href="/packages/tirthan-jibhi-sirasar-lake-10"
                variant="primary"
              >
                Check Now 🚀
              </Button>
            </div>
            <div className="package">
              <h5>Kedarnath 4D/3N</h5>
              <p>Starting from ₹9499.00</p>
              <Button href="/packages/kedarnath-11" variant="primary">
                Check Now 🚀
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BlogList;
