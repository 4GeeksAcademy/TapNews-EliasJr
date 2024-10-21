import React, { useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Context } from "../../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export const AddNewspaper = () => {
    const { actions } = useContext(Context);
    const [newNewspaper, setNewNewspaper] = useState({
        name: "",
        description: "",
        logo: "",
        link: ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.createNewspaper(newNewspaper);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "New newspaper added",
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(() => {
            navigate("/newspapers");
        }, 1500);
    };

    return (
        <div className="container mt-4">
            <h1 className="display-4 text-center mb-4 text-dark">Add New Newspaper</h1>
            <Card className="shadow bg-light">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="newspaperName">
                            <Form.Label className="fw-bold">Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter newspaper name"
                                value={newNewspaper.name}
                                onChange={(e) => setNewNewspaper({ ...newNewspaper, name: e.target.value })}
                                required
                                className="shadow-sm"
                            />
                        </Form.Group>
                        <Form.Group controlId="newspaperDescription" className="mt-3">
                            <Form.Label className="fw-bold">Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter newspaper description"
                                value={newNewspaper.description}
                                onChange={(e) => setNewNewspaper({ ...newNewspaper, description: e.target.value })}
                                className="shadow-sm"
                            />
                        </Form.Group>
                        <Form.Group controlId="newspaperLogo" className="mt-3">
                            <Form.Label className="fw-bold">Logo URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter logo URL"
                                value={newNewspaper.logo}
                                onChange={(e) => setNewNewspaper({ ...newNewspaper, logo: e.target.value })}
                                className="shadow-sm"
                            />
                        </Form.Group>
                        <Form.Group controlId="newspaperLink" className="mt-3">
                            <Form.Label className="fw-bold">Link</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter newspaper link"
                                value={newNewspaper.link}
                                onChange={(e) => setNewNewspaper({ ...newNewspaper, link: e.target.value })}
                                className="shadow-sm"
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-between mt-4 flex-wrap">
                            <Button variant="primary" type="submit" className="shadow">
                                Add Newspaper
                            </Button>
                        </div>

                        <div className="d-flex justify-content-end mt-2">
                            <Link to="/newspapers">
                                <Button variant="secondary" className="shadow">
                                    Back to Newspapers
                                </Button>
                            </Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};
