import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Context } from "../../store/appContext";
import "../../../styles/index.css";

export const CardAuthor = (props) => {
  const { actions } = useContext(Context);

  return (
    <Card className="m-2 shadow-sm" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.photo} alt={props.name} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text>ID: {props.id}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button variant="outline-primary" onClick={() => actions.loadAuthors()}>
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
