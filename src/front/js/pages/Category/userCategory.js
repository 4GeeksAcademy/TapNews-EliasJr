import React, { useEffect, useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const UserCategories = () => {
    const { store, actions } = useContext(Context);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        if (!store.auth) {
            navigate("/");
        } else {
            actions.loadCategories();
        }
    }, [store.auth]);

    const handleSelectCategory = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleContinue = () => {
        navigate("/user-private-page");
    };

    return (
        <div className="container d-flex flex-column align-items-center mt-5" style={{ minHeight: "100vh" }}>
            <h1 className="display-4 text-center mb-4">Add one or more categories</h1>

            <Button variant="primary" className="mb-3" onClick={handleShowModal}>
                Add Categories
            </Button>

            <hr className="my-4" />

            <Modal show={showModal} onHide={handleCloseModal} className="mt-5">
                <Modal.Header closeButton>
                    <Modal.Title>Select Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-wrap justify-content-center">
                        {store.categories.length === 0 ? (
                            <p className="text-center w-100">--- No categories available ---</p>
                        ) : (
                            store.categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategories.includes(category.id) ? "success" : "outline-primary"}
                                    className="m-2"
                                    onClick={() => handleSelectCategory(category.id)}
                                >
                                    {category.name}
                                </Button>
                            ))
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="secondary" onClick={handleCloseModal} style={{ width: '120px' }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseModal} style={{ width: '120px' }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {selectedCategories.length > 0 && (
                <Link to="/user-private-page">
                    <Button variant="success" onClick={handleContinue}>
                        Continue
                    </Button>
                </Link>
            )}
        </div>
    );
};
