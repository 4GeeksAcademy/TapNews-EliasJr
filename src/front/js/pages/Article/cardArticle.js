import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Context } from "../../store/appContext";

export const CardArticle = ({
  id,
  title,
  content,
  image,
  published_date,
  source,
  link,
  author,
  newspaper,
  category,
}) => {
  const { store, actions } = useContext(Context);

  return (
    <Card className="my-3">
      {image ? (
        <Card.Img variant="top" src={image} alt={title} />
      ) : (
        <Card.Img variant="top" src="path/to/default-image.jpg" alt="Image not available" />
      )}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {content && typeof content === "string" ? (
            content
          ) : (
            <p>Contenido no disponible</p>
          )}
        </Card.Text>
        <Card.Footer>
          <small className="text-muted">
            {published_date && new Date(published_date).toLocaleDateString()}
            {source && ` | ${source}`}
            {newspaper && ` | ${newspaper.name}`}
            {author && ` | by ${author.name}`}
            {category && ` | Category: ${category.name}`}
          </small>
        </Card.Footer>

        <div className="d-flex align-items-center mt-3">
          <Button variant="primary" href={link} target="_blank" className="me-2">
            Read More
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
