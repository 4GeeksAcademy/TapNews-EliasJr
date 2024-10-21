import React, { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Context } from "../../store/appContext";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/index.css";

export const CardAuthor = (props) => {
  const { actions } = useContext(Context);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
    Swal.fire({
      icon: 'success',
      title: isFavorited ? 'Removed from favorites!' : 'Added to favorites!',
      showConfirmButton: false,
      timer: 1500
    });
    // Aquí podrías agregar la lógica para manejar el autor favorito
    // actions.toggleFavorite(props.id);
  };

  return (
    <Card className="m-2 shadow-sm" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.photo} alt={props.name} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text>ID: {props.id}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button variant="outline-primary" onClick={handleFavoriteToggle}>
            <FontAwesomeIcon icon={faHeart} color={isFavorited ? "red" : "grey"} />
            {isFavorited ? ' Unfavorite' : ' Favorite'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
