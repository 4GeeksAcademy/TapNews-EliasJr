import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { ArticleCard } from "./articleCard";

export const ArticlesView = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/getApiArticle`);
        if (!response.ok) {
          throw new Error("Error fetching articles");
        }

        const data = await response.json();

        setArticles(data.articles || []);
        setLoading(false);
      } catch (error) {
        setError("Error fetching articles");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Latest News</h1>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      <Row>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <Col md={4} key={index}>
              <ArticleCard article={article} />
            </Col>
          ))
        ) : (
          !loading && (
            <Col>
              <Alert variant="info">No articles available at the moment.</Alert>
            </Col>
          )
        )}
      </Row>
    </Container>
  );
};
