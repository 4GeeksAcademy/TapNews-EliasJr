import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Context } from "../../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../styles/addArticle.css";

export const AddArticle = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [articleData, setArticleData] = useState({
        title: "",
        content: "",
        image: "",
        published_date: "",
        source: "",
        link: "",
        author_id: "",
        newspaper_id: "",
        category_id: ""
    });

    const handleChange = (event) => {
        setArticleData({
            ...articleData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await actions.createArticle(articleData);
        if (success) {
            Swal.fire({
                icon: "success",
                title: "Article added!",
                text: "The article has been successfully added."
            });
            navigate("/articles");
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "There was a problem adding the article."
            });
        }
    };

    return (
        <div className="container mt-4 text-dark">
            <h1 className="display-4 text-center mb-4">Add New Article</h1>
            <div className="shadow p-4 mb-5 bg-light rounded">
                <Form onSubmit={handleSubmit}>
                    {[
                        { label: "Title", name: "title", type: "text", placeholder: "Enter article title", required: true },
                        { label: "Content", name: "content", type: "textarea", placeholder: "Enter article content", required: true },
                        { label: "Image URL", name: "image", type: "text", placeholder: "Enter image URL" },
                        { label: "Published Date", name: "published_date", type: "date" },
                        { label: "Source", name: "source", type: "text", placeholder: "Enter article source" },
                        { label: "Link", name: "link", type: "text", placeholder: "Enter article link" },
                        { label: "Author ID", name: "author_id", type: "number", placeholder: "Enter author ID", required: true },
                        { label: "Newspaper ID", name: "newspaper_id", type: "number", placeholder: "Enter newspaper ID", required: true },
                        { label: "Category ID", name: "category_id", type: "number", placeholder: "Enter category ID", required: true }
                    ].map((field, index) => (
                        <Form.Group controlId={`article${field.name}`} className="mt-3" key={index}>
                            <Form.Label>{field.label}</Form.Label>
                            <Form.Control
                                as={field.type === "textarea" ? "textarea" : "input"}
                                type={field.type}
                                placeholder={field.placeholder}
                                name={field.name}
                                value={articleData[field.name]}
                                onChange={handleChange}
                                required={field.required}
                                className="input-field"
                                rows={field.type === "textarea" ? 3 : undefined}
                            />
                        </Form.Group>
                    ))}
                    <div className="d-flex justify-content-between mt-4">
                        <Button variant="primary" type="submit" className="shadow">
                            Add Article
                        </Button>
                        <Link to="/articles">
                            <Button variant="secondary" className="shadow">
                                Back to Articles
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};
