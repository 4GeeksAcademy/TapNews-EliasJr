import React, { useContext, useState } from "react";
import { Card, Button, Accordion } from "react-bootstrap";
import { Context } from "../../store/appContext";
import "../../../styles/cardAuthor.css"; // Importa el archivo CSS

export const CardAuthor = ({ id, name, description, photo, additionalInfo }) => {
  const { actions } = useContext(Context);
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="m-2 shadow-sm card-author">
      {photo ? (
        <Card.Img variant="top" src={photo} alt={name} />
      ) : (
        <Card.Img variant="top" src="path/to/default-image.jpg" alt="Image not available" />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto">
        </div>
      </Card.Body>
    </Card>
  );
};
