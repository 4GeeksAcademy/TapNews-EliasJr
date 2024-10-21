import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "../../../styles/index.css";

export const UserLoginForm = ({ onClose }) => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const response = await actions.login(email, password);

        if (response.success) {
            navigate("/loginOk");
        } else {
            setError(response.message);
        }
    };

    return (
        <div className="container text-center mt-5">
            <h1>Iniciar Sesión</h1>
            <br />
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="btn btn-primary">Iniciar Sesión</Button>
                <Link to="/">
                    <button type="button" className="btn btn-secondary" style={{ margin: "5px" }}>
                        Volver a Inicio
                    </button>
                </Link>
            </form>
            <p className="text-center mt-4">
                ¿No tienes una cuenta?{" "}
                <Link to="/user-signup" className="text-primary">
                    Regístrate aquí
                </Link>
            </p>
        </div>
    );
};
