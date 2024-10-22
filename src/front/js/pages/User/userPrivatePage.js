import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert, Button, Nav } from "react-bootstrap";
import "../../../styles/index.css";
import { CardArticle } from "../Article/cardArticle";

export const UserPrivatePage = () => {
    const { store, actions } = useContext(Context);
    const [isChecking, setIsChecking] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleArticles, setVisibleArticles] = useState(6);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        const checkAuth = async () => {
            await actions.verifyToken();
            setIsChecking(false);
        };

        const fetchData = async () => {
            try {
                await actions.getArticles();
                setLoading(false);
            } catch (err) {
                setError("Error fetching data");
                setLoading(false);
            }
        };

        checkAuth().then(fetchData);
    }, []);

    const loadMoreArticles = () => {
        setVisibleArticles((prev) => prev + 6); 
    };

    if (isChecking) {
        return <div className="text-center"><h1>Cargando...</h1></div>;
    }

    if (!store.auth) {
        return <Navigate to="/user-login" />;
    }

    const articlesToShow = store.articles; // Solo mostramos los artículos

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Noticias de última hora!</h1>

            <Nav variant="tabs" className="justify-content-center mb-4">
                <Nav.Item>
                    <Nav.Link active={activeTab === "all"} onClick={() => setActiveTab("all")}>Todos</Nav.Link>
                </Nav.Item>
            </Nav>

            {loading && (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                </div>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                {articlesToShow.length > 0 ? (
                    articlesToShow.slice(0, visibleArticles).map((article) => (
                        <Col md={4} key={article.id} className="mb-4">
                            <CardArticle
                                id={article.id}
                                title={article.title}
                                content={article.content}
                                image={article.image}
                                published_date={article.published_date}
                                source={article.source}
                                link={article.link}
                                author={article.author}
                                newspaper={article.newspaper}
                                category={article.category}
                            />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <Alert variant="info">No hay artículos disponibles.</Alert>
                    </Col>
                )}
            </Row>
            {articlesToShow.length > visibleArticles && ( 
                <div className="text-center my-4">
                    <Button onClick={loadMoreArticles} variant="primary">
                        Cargar más artículos
                    </Button>
                </div>
            )}
        </Container>
    );
};
