import React from "react";
import { Card, Button } from "react-bootstrap";

export const ArticleCard = ({ article }) => {
  const {
    title,
    content,
    link,
    newspaper,
    published_date,
    image,
  } = article;

  return (
    <Card className="my-3">
      {image ? (
        <Card.Img variant="top" src={image} alt={title} />
      ) : (
        <Card.Img
          variant="top"
          src="path/to/default-image.jpg"
          alt="Image not available"
        />
      )}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {content && typeof content === "string" ? content.substring(0, 100) + "..." : "No content available"}
        </Card.Text>
        <Card.Footer>
          <small className="text-muted">
            {new Date(published_date).toLocaleDateString()} | {newspaper?.name}
          </small>
        </Card.Footer>

        <Button variant="primary" href={link} target="_blank" className="mt-2">
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
};
