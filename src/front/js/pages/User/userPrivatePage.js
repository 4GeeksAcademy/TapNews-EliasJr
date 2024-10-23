import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Container, Row, Col, Button, Nav, Dropdown } from "react-bootstrap";
import "../../../styles/index.css";
import { CardArticle } from "../Article/cardArticle";

export const UserPrivatePage = () => {
    const { store, actions } = useContext(Context);
    const [visibleArticles, setVisibleArticles] = useState(6);
    const [activeTab, setActiveTab] = useState("todos");
    const [selectedCategory, setSelectedCategory] = useState("all");  // Nueva variable de estado

    useEffect(() => {
        const fetchData = async () => {
            try {
                await actions.getArticles();
                await actions.getFavorites();
                await actions.loadCategories();  // Obtener las categorías desde el backend
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };
        fetchData();
    }, []);

    const loadMoreArticles = () => setVisibleArticles((prev) => prev + 6);

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
        setVisibleArticles(6);
    };

    // Función para manejar el cambio de categoría
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setVisibleArticles(6);
    };

    // Filtrar artículos por categoría seleccionada en la pestaña "Todos"
    const filteredArticles =
        selectedCategory === "all"
            ? store.articles
            : store.articles.filter((article) => article.category === selectedCategory);

    const articlesToDisplay =
        activeTab === "favoritos" ? store.favArticles : filteredArticles;

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Noticias de última hora!</h1>

            <Nav variant="tabs" className="justify-content-center mb-4">
                <Nav.Item>
                    <Nav.Link
                        active={activeTab === "todos"}
                        onClick={() => handleTabSelect("todos")}
                    >
                        Todos
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        active={activeTab === "favoritos"}
                        onClick={() => handleTabSelect("favoritos")}
                    >
                        Favoritos
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {/* Mostrar filtro de categorías solo en la pestaña "Todos" */}
            {activeTab === "todos" && (
                <div className="d-flex justify-content-center mb-4">
                    <Dropdown onSelect={handleCategorySelect}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectedCategory === "all" ? "Todas las categorías" : selectedCategory}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="all">Todas las categorías</Dropdown.Item>
                            {store.categories.map((category) => (
                                <Dropdown.Item key={category.id} eventKey={category.name}>
                                    {category.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )}

            {articlesToDisplay.length === 0 ? (
                <div className="text-center my-5">
                    <h5>No hay artículos disponibles en esta pestaña.</h5>
                </div>
            ) : (
                <Row>
                    {articlesToDisplay.slice(0, visibleArticles).map((article) => (
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
                    ))}
                </Row>
            )}

            {articlesToDisplay.length > visibleArticles && (
                <div className="text-center my-4">
                    <Button onClick={loadMoreArticles} variant="primary">
                        Cargar más artículos
                    </Button>
                </div>
            )}
        </Container>
    );
};
