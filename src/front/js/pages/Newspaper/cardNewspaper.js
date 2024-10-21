import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import Swal from "sweetalert2";
import "../../../styles/index.css";

export const CardNewspaper = (props) => {
  const { actions } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: props.name,
    description: props.description,
    logo: props.logo,
    link: props.link,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    await actions.updateNewspaper(props.id, formData);
    Swal.fire("Updated!", "Your newspaper has been updated.", "success");
    setIsEditing(false);
  };

  const handleDeletePaper = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await actions.deleteNewspaper(props.id);
        Swal.fire('Deleted!', 'Your newspaper has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="card m-2 shadow-sm" style={{ width: "18rem" }}>
      <img
        src={formData.logo}
        className="card-img-top img-fluid"
        alt={formData.name || "Newspaper"}
        style={{ height: "auto", objectFit: "contain" }}
      />
      <div className="card-body">
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={formData.name}
              className="form-control mb-2"
              onChange={handleChange}
              placeholder="Newspaper Name"
            />
            <textarea
              name="description"
              value={formData.description}
              className="form-control mb-2"
              onChange={handleChange}
              placeholder="Description"
            />
            <input
              type="text"
              name="logo"
              value={formData.logo}
              className="form-control mb-2"
              onChange={handleChange}
              placeholder="Logo URL"
            />
            <input
              type="text"
              name="link"
              value={formData.link}
              className="form-control mb-2"
              onChange={handleChange}
              placeholder="Link"
            />
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h5 className="card-title">{formData.name}</h5>
            <p className="card-text">Description: {formData.description}</p>
            <p className="card-text">
              Link:{" "}
              <a href={formData.link} target="_blank" rel="noopener noreferrer">
                {formData.link}
              </a>
            </p>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-outline-secondary" onClick={() => setIsEditing(true)}>
                <i className="fa-solid fa-pencil"></i> Edit
              </button>
              <button className="btn btn-danger" onClick={handleDeletePaper}>
                DELETE
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
