import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import Swal from "sweetalert2";
import "../../../styles/index.css";

export const CardAuthor = (props) => {
  const { actions } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAuthor, setEditedAuthor] = useState({
    name: props.name,
    description: props.description,
    photo: props.photo,
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setEditedAuthor({
      ...editedAuthor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    await actions.updateAuthor(props.id, editedAuthor);
    setIsEditing(false);
    Swal.fire("Saved!", "", "success");
  };

  return (
    <div className="card m-2 shadow-sm" style={{ width: "18rem" }}>
      <img
        src={editedAuthor.photo}
        className="card-img-top"
        alt={editedAuthor.name}
      />
      <div className="card-body">
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={editedAuthor.name}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Name"
            />
            <input
              type="text"
              name="description"
              value={editedAuthor.description}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Description"
            />
            <input
              type="text"
              name="photo"
              value={editedAuthor.photo}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Photo URL"
            />
            <div className="d-flex justify-content-between mt-3">
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100 ms-2"
                onClick={handleEditToggle}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h5 className="card-title">{editedAuthor.name}</h5>
            <p className="card-text m-0">{editedAuthor.description}</p>
            <p className="card-text m-0">{editedAuthor.photo}</p>
            <p className="card-text m-0">ID: {props.id}</p>
            <div className="d-flex justify-content-between mt-3">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleEditToggle}
              >
                <i className="fa-solid fa-pencil"></i> Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  actions.deleteAuthor(props.id);
                  Swal.fire(
                    "Deleted!",
                    "The author has been deleted.",
                    "success"
                  );
                }}
              >
                DELETE
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
