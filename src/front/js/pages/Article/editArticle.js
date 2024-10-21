import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Context } from "../../store/appContext";
import Swal from "sweetalert2";
import "../../../styles/editArticle.css";

export const EditArticle = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: "",
        published_date: "",
        source: "",
        author: "",
        newspaper: "",
        category: ""
    });

    useEffect(() => {
        const article = store.articles.find(art => art.id === parseInt(id));
        if (article) {
            setFormData({
                title: article.title,
                content: article.content,
                image: article.image,
                published_date: article.published_date,
                source: article.source,
                author: article.author,
                newspaper: article.newspaper,
                category: article.category
            });
        } else {
            navigate("/articles"); // Redirige si no encuentra el artículo
        }
    }, [id, store.articles]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await actions.updateArticle(id, formData);
                Swal.fire("Saved!", "", "success");
                navigate("/articles");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Edit Article</h2>
            <Form className="shadow p-4 bg-light rounded" onSubmit={handleSubmit}>
                {[
                    { label: "Title", name: "title", type: "text", required: true },
                    { label: "Content", name: "content", type: "textarea", required: true },
                    { label: "Image URL", name: "image", type: "text" },
                    { label: "Published Date", name: "published_date", type: "date", required: true },
                    { label: "Source", name: "source", type: "text" },
                    { label: "Author", name: "author", type: "text" },
                    { label: "Newspaper", name: "newspaper", type: "text" },
                    { label: "Category", name: "category", type: "text" }
                ].map((field, index) => (
                    <Form.Group controlId={`formArticle${field.name}`} className="mt-3" key={index}>
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Control
                            as={field.type === "textarea" ? "textarea" : "input"}
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            rows={field.type === "textarea" ? 5 : undefined}
                        />
                    </Form.Group>
                ))}
                <div className="d-flex justify-content-between mt-4">
                    <Button variant="primary" type="submit" className="shadow">
                        Save Changes
                    </Button>
                    <Button variant="secondary" className="ms-2 shadow" onClick={() => navigate("/articles")}>
                        Back
                    </Button>
                </div>
            </Form>
        </div>
    );
};
