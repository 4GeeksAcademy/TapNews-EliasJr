import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";
import { Context } from "../../store/appContext";
import { CardNewspaper } from "./cardNewspaper";

export const Newspaper = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getNewspapers();
    }, [actions]);

    return (
        <Container className="mt-5 shadow p-4 bg-white rounded">
            <h1 className="display-4 text-center mb-4 text-dark">Newspapers</h1>

            <div className="d-flex justify-content-between mt-3 mb-3 flex-wrap">
                <Link to="/add-newspaper">
                    <Button variant="primary" className="mx-2 mb-2 shadow">
                        Add Newspaper
                    </Button>
                </Link>
                <Link to="/">
                    <Button variant="secondary" className="mx-2 mb-2 shadow mt-2">
                        Back to Home
                    </Button>
                </Link>
            </div>

            <hr className="my-4" />

            <Row className="justify-content-center">
                {store.newspapers.length === 0 ? (
                    <p className="text-center">--- No newspapers available ---</p>
                ) : (
                    store.newspapers.map((newspaper) => (
                        <Col md={4} key={newspaper.id} className="mb-4">
                            <CardNewspaper
                                id={newspaper.id}
                                name={newspaper.name}
                                description={newspaper.description}
                                logo={newspaper.logo}
                                link={newspaper.link}
                            />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};
