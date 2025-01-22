import React, { useEffect, useState } from 'react';
import { fetchBlogList } from '../../api/blogListService'; // BlogList API service
import { fetchFeaturedPackages } from '../../api/packageTypeService'; // Featured packages API service
import type { Blog } from '../../types/blogTypes'; // Blog type
import type { PackageType } from '../../types/packageTypeTypes'; // Package type
import { Container, Row, Col, Button } from 'react-bootstrap';
import './styles/BlogList.css'; // BlogList styles

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]); // State to hold blogs
  const [featuredPackages, setFeaturedPackages] = useState<PackageType[]>([]); // State to hold featured packages
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blogs
        const blogsData = await fetchBlogList();
        setBlogs(blogsData);

        // Fetch featured packages
        const packagesData = await fetchFeaturedPackages();
        setFeaturedPackages(packagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
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
            {featuredPackages.map((pkg) => (
              <div key={pkg.id} className="package">
                <img src={pkg.image} alt={pkg.name} className="package-image" />
                <h5>{pkg.name}</h5>
                <p>
                  {pkg.days}D/{pkg.nights}N - {pkg.location}
                </p>
                <p>
                  {pkg.starting_price
                    ? `Starting from ₹${pkg.starting_price.toFixed(2)}`
                    : 'Contact for Pricing'}
                </p>
                <Button
                  href={`/packages/${pkg.slug}`}
                  className="check-now-button"
                  variant="primary"
                >
                  Check Now 🚀
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BlogList;
