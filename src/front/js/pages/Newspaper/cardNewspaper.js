import React from "react";
import { Card, Button } from "react-bootstrap";
import "../../../styles/cardNewspaper.css"; // Asegúrate de tener este CSS si es necesario

export const CardNewspaper = ({ id, name, description, logo, link }) => {
    return (
        <Card className="my-3 shadow card-newspaper">
            <Card.Img variant="top" src={logo || "path/to/default-logo.jpg"} alt={name} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Button variant="outline-primary" href={link} target="_blank">
                        Visit Website
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};
