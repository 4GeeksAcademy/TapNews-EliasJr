import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Context } from "../../store/appContext";
import { CardAuthor } from "./cardAuthor";

export const Author = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadAuthors();
    }, []);

    return (
        <Container className="my-4">
            <div className="d-flex justify-content-between mt-3 mb-3">
                <h1 className="display-4">Authors</h1>
                <div>
                    <Link to="/add-author" className="me-2">
                        <Button variant="primary" className="shadow">Add Author</Button>
                    </Link>

                    <Link to="/admin-private-page" className="me-2">
                        <Button variant="secondary" className="shadow">Back to Home</Button>
                    </Link>
                </div>
            </div>

            <hr className="my-4" />

            {store.authors.length === 0 ? (
                <h3 className="text-center">--- No authors available ---</h3>
            ) : (
                <Row>
                    {store.authors.map((author) => (
                        <Col md={4} key={author.id}>
                            <CardAuthor
                                id={author.id}
                                name={author.name}
                                description={author.description}
                                photo={author.photo}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};
