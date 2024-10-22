import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import { CardArticle } from "./cardArticle";
import { Button, Container, Row, Col } from "react-bootstrap";

export const Article = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getArticles();
    }, []);

    const getArticleById = (articleId) => {
        actions.getArticleById(articleId);
    };

    return (
        <Container className="my-4">
            <div className="d-flex justify-content-between mt-3 mb-3">
                <h1 className="display-4">Articles</h1>
                <div>
                    <Link to="/add-article" className="me-2">
                        <Button variant="primary" className="shadow">Add Article</Button>
                    </Link>

                    <Link to="/" className="me-2">
                        <Button variant="secondary" className="shadow">Back to home</Button>
                    </Link>
                </div>
            </div>

            <hr className="my-4" />

            {store.articles.length === 0 ? (
                <h3 className="text-center">No articles found. Please add one.</h3>
            ) : (
                <Row>
                    {store.articles.map((article) => (
                        <Col md={4} key={article.id}>
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
                    ))}
                </Row>
            )}
        </Container>
    );
};
