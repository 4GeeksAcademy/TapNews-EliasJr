import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";
import { Context } from "../../store/appContext";
import { CardAuthor } from "./cardAuthor";

export const Author = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();

    useEffect(() => {
        actions.loadAuthors();
    }, []);

    return (
        <Container className="mt-5 shadow p-4 bg-white rounded">
            <h1 className="display-4 text-center mb-4 text-dark">Authors</h1>

            <div className="d-flex justify-content-between mt-3 mb-3 flex-wrap">
                <Link to="/add-author">
                    <Button variant="primary" className="mx-2 mb-2 shadow">
                        Add Author
                    </Button>
                </Link>

                {/* Botón para volver a la página de inicio */}
                <Link to="/">
                    <Button variant="secondary" className="mx-2 mb-2 shadow mt-2">
                        Back to Home
                    </Button>
                </Link>
            </div>

            <hr className="my-4" />

            <Row className="justify-content-center">
                {store.authors.length === 0 ? (
                    <p className="text-center">--- No authors available ---</p>
                ) : (
                    store.authors.map((author) => (
                        <Col md={4} key={author.id} className="mb-4">
                            <CardAuthor
                                id={author.id}
                                name={author.name}
                                description={author.description}
                                photo={author.photo}
                            />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};
