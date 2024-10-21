import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Context } from "../../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export const AddCategory = () => {
    const { actions } = useContext(Context);
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.newCategory(newCategory);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "New category added",
            showConfirmButton: false,
            timer: 1500,
        });
        setTimeout(() => {
            navigate("/categories");
        }, 1500);
    };

    return (
        <div className="container mt-4">
            <h1 className="display-4 text-center mb-4 text-dark">Add New Category</h1>
            <div className="shadow p-4 mb-5 bg-white rounded">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="categoryName">
                        <Form.Label className="fw-bold">Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            required
                            className="shadow-sm"
                        />
                    </Form.Group>
                    <Form.Group controlId="categoryDescription" className="mt-3">
                        <Form.Label className="fw-bold">Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category description"
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            className="shadow-sm"
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-4 flex-wrap">
                        <Button variant="primary" type="submit" className="shadow">
                            Add Category
                        </Button>
                        <Link to="/categories">
                            <Button variant="secondary" className="shadow">
                                Back to Categories
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};
