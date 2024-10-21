import React, { useContext, useState, useEffect } from "react";
import { Card, Button, Accordion } from "react-bootstrap";
import { Context } from "../../store/appContext";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
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
}) => {
  const { store, actions } = useContext(Context);
  const [isLiked, setIsLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Verificar si el artículo está en favoritos cuando se monta el componente
    const favoriteArticle = store.favoriteArticles.find(article => article.article_id === id);
    setIsLiked(!!favoriteArticle);
  }, [store.favoriteArticles, id]);

  const handleLike = async () => {
    const userId = "123"; // Cambia esto según la implementación de tu ID de usuario.

    if (isLiked) {
      await actions.removeFavoriteArticle(id);
    } else {
      await actions.addFavoriteArticle(id, userId);
    }

    setIsLiked(!isLiked);
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
              {content && typeof content === "string" ? (
                content
              ) : (
                <p>Contenido no disponible</p>
              )}
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
          <button onClick={handleLike} className="like-button" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            {isLiked ? (
              <MdFavorite color="red" size={24} title="Desmarcar como favorito" />
            ) : (
              <MdFavoriteBorder size={24} title="Marcar como favorito" />
            )}
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};
