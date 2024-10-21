import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const UserSignupForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { actions } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await actions.signup(firstName, lastName, email, password);
        if (response.success) {
            setSignupSuccess(true);
        } else {
            setErrorMessage(response.message);
        }
    };

    if (signupSuccess) {
        return <Navigate to="/signupok" replace />;
    }

    return (
        <div className="container text-center mt-5">
            <h1>Registro</h1>
            <br />
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
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
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Registrarse
                </button>
                <Link to="/">
                    <button type="button" className="btn btn-secondary" style={{ margin: "5px" }}>
                        Volver a Inicio
                    </button>
                </Link>
            </form>
            <p className="text-center mt-4">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/user-login" className="text-primary">
                    Inicia sesión aquí
                </Link>
            </p>
        </div>
    );
};
