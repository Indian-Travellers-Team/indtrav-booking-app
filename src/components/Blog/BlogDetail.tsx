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
    return (
      <div className="mountain-blog-detail-wrapper">
        <div className="mountain-loading">
          <div className="mountain-shape"></div>
          <div className="loading-text">Loading mountain stories...</div>
        </div>
      </div>
    );
  }

  if (!blogDetail) {
    return (
      <div className="mountain-blog-detail-wrapper">
        <div className="not-found-message">Blog not found.</div>
      </div>
    );
  }

  return (
    <div className="mountain-blog-detail-wrapper">
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

      <Container className="blog-detail-container">
        <Row>
          <Col lg={8} className="blog-content-section">
            <div className="mountain-blog-content-card">
              <div className="section-header">
                <h1 className="mountain-blog-title">{blogDetail.title}</h1>
                <div className="mountain-divider">
                  <div className="mountain-peak"></div>
                </div>
              </div>

              <div className="blog-author">
                <span>written by </span>
                {blogDetail.author}
              </div>

              {/* Process the content to replace image tags */}
              <div className="blog-content">
                {(() => {
                  let processedContent = blogDetail.content;

                  // Replace image tags with the actual images from the array
                  if (blogDetail.images && blogDetail.images.length > 0) {
                    blogDetail.images.forEach((image, index) => {
                      const imageTag = `<image-${index + 1}>`;
                      const replacement = `
                        <div class="mountain-blog-image-container">
                          <img src="${image}" alt="Blog image ${index + 1}" class="blog-image" />
                          <div class="mountain-overlay"></div>
                        </div>
                      `;

                      processedContent = processedContent.replace(
                        imageTag,
                        replacement,
                      );
                    });
                  }

                  return (
                    <div
                      dangerouslySetInnerHTML={{ __html: processedContent }}
                    />
                  );
                })()}
              </div>
            </div>
          </Col>

          <Col lg={4} className="featured-packages-section">
            <FeaturedPackages />
          </Col>
        </Row>
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

export default BlogDetailPage;
