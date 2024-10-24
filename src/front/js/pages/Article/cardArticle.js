import React, { useContext, useState, useEffect } from "react";
import { Card, Button, Accordion } from "react-bootstrap";
import { Context } from "../../store/appContext";
import "../../../styles/cardArticle.css";

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
  isFavoriteProp 
}) => {
  const { store, actions } = useContext(Context);
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isFavoriteProp || false); 

  // Sincronizar el estado de favoritos con el store
  useEffect(() => {
    const favoriteExists = store.favArticles.some((fav) => fav.article_id === id);
    setIsFavorite(favoriteExists);
  }, [store.favArticles, id]);

  const handleFavoriteToggle = () => {
    const userId = 1; // 
    if (isFavorite) {
      actions.removeFavorite(id, userId);
    } else {
      actions.addFavorite(id, userId);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="my-3 shadow card-article">
      {image ? (
        <Card.Img variant="top" src={image} alt={title} />
      ) : (
        <Card.Img variant="top" src="path/to/default-image.jpg" alt="Image not available" />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={() => setExpanded(!expanded)}>
              {expanded ? "Ver Menos" : "Ver Más"}
            </Accordion.Header>
            <Accordion.Body>
              {content && typeof content === "string" ? content : <p>Contenido no disponible</p>}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Card.Footer>
          <small className="text-muted">
            {published_date && new Date(published_date).toLocaleDateString()}
            {source && ` | ${source}`}
            {newspaper && ` | ${newspaper.name}`}
            {author && ` | by ${author.name}`}
            {category && ` | Category: ${category.name}`}
          </small>
        </Card.Footer>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <Button variant="primary" href={link} target="_blank">
            Leer Más
          </Button>
          <Button
            variant={isFavorite ? "danger" : "outline-primary"}
            className="ml-2"
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? "❤️" : "🤍"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
