import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Context } from "../../store/appContext";
import { CardNewspaper } from "./cardNewspaper";

export const Newspaper = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getNewspapers();
    }, []);

    return (
        <Container className="my-4">
            <div className="d-flex justify-content-between mt-3 mb-3">
                <h1 className="display-4">Newspapers</h1>
                <div>
                    <Link to="/add-newspaper" className="me-2">
                        <Button variant="primary" className="shadow">Add Newspaper</Button>
                    </Link>
                    <Link to="/admin-private-page" className="me-2">
                        <Button variant="secondary" className="shadow">Back to Home</Button>
                    </Link>
                </div>
            </div>

            <hr className="my-4" />

            {store.newspapers.length === 0 ? (
                <h3 className="text-center">--- No newspapers available ---</h3>
            ) : (
                <Row>
                    {store.newspapers.map((newspaper) => (
                        <Col md={4} key={newspaper.id}>
                            <CardNewspaper
                                id={newspaper.id}
                                name={newspaper.name}
                                description={newspaper.description}
                                link={newspaper.link}
                                category={newspaper.category}
                                country={newspaper.country}  
                                language={newspaper.language}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};
