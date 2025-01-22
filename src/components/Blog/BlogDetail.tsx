import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBlogDetail } from '../../api/blogDetailService'; // Blog API Service
import type { BlogDetail } from '../../types/blogDetailTypes'; // BlogDetail Type
import { Container, Row, Col } from 'react-bootstrap';
import FeaturedPackages from '../Package/FeaturedPackages'; // Featured Packages Component
import './styles/BlogDetail.css'; // Blog Detail styles

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogDetail, setBlogDetail] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          const data = await fetchBlogDetail(slug);
          setBlogDetail(data);
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blogDetail) {
    return <div>Blog not found.</div>;
  }

  return (
    <Container className="blog-detail-container">
      <Row>
        {/* Blog Content Section */}
        <Col lg={8} className="blog-content-section">
          <h1 className="blog-title">{blogDetail.title}</h1>
          <p className="blog-author">
            written by <span>{blogDetail.author}</span>
          </p>
          <img
            src={`http://127.0.0.1:8000${blogDetail.images[0]}`}
            alt={blogDetail.title}
            className="blog-image"
          />
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blogDetail.content }}
          />
        </Col>

        {/* Featured Packages Section */}
        <Col lg={4} className="featured-packages-section">
          <FeaturedPackages />
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetailPage;
