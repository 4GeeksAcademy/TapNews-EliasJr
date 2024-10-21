import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Table, Container } from "react-bootstrap";
import { Context } from "../../store/appContext";
import Swal from "sweetalert2";

export const Category = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const [editMode, setEditMode] = useState(null); // Controla qué categoría está siendo editada
  const [editedCategory, setEditedCategory] = useState({}); // Guarda los valores editados

  useEffect(() => {
    actions.loadCategories();
  }, []);

  const handleDeleteCategory = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await actions.deleteCategory(id);
          Swal.fire({
            title: "Deleted!",
            text: "The category has been deleted.",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the category.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleEditClick = (category) => {
    setEditMode(category.id);
    setEditedCategory({ ...category }); // Copia la categoría actual para la edición
  };

  const handleSaveClick = async (id) => {
    try {
      await actions.updateCategory(id, editedCategory); // Guarda la categoría actualizada
      Swal.fire("Success!", "The category has been updated.", "success");
      setEditMode(null); // Salimos del modo de edición
    } catch (error) {
      Swal.fire("Error!", "Failed to update the category.", "error");
    }
  };

  const handleChange = (e) => {
    setEditedCategory({
      ...editedCategory,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container className="my-4 shadow p-4 bg-white rounded">
      <h1 className="display-4 text-center my-4 text-dark">Categories</h1>

      <div className="d-flex justify-content-between mt-3 mb-3 flex-wrap">
        <Link to="/add-category">
          <Button variant="primary" className="mx-2 mb-2 shadow">
            Add Category
          </Button>
        </Link>

        {location.pathname === "/categories" && (
          <Link to="/">
            <Button variant="secondary" className="mx-2 mb-2 shadow mt-2">
              Back to Home
            </Button>
          </Link>
        )}
      </div>

      <hr className="my-4" />

      <div className="table-responsive">
        <Table striped bordered hover className="shadow">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {store.categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  --- Add a new category ---
                </td>
              </tr>
            ) : (
              store.categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>
                    {editMode === category.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedCategory.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td>
                    {editMode === category.id ? (
                      <input
                        type="text"
                        name="description"
                        value={editedCategory.description}
                        onChange={handleChange}
                        className="form-control"
                      />
                    ) : (
                      category.description
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-around flex-wrap">
                      {editMode === category.id ? (
                        <>
                          <Button
                            variant="success"
                            className="mx-1 mb-1"
                            onClick={() => handleSaveClick(category.id)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="secondary"
                            className="mx-1 mb-1"
                            onClick={() => setEditMode(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="warning"
                            className="mx-1 mb-1"
                            onClick={() => handleEditClick(category)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            className="mx-1 mb-1"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
