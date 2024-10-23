import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import Swal from "sweetalert2";

export const AdmiLogin = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await actions.adminLogin(email, password);
    
            if (result.success) {
                Swal.fire({
                    title: '¡Inicio de sesión exitoso!',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                }).then(() => {
                    navigate("/admin-private-page");
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de inicio de sesión',
                    text: result.message,
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: 'Por favor, verifica tus credenciales.',
            });
        }
    };
    

    return (
        <div className="container text-center mt-5">
            <h1>Iniciar sesión (admin)</h1>
            <form onSubmit={handleSubmit} className="mt-4">
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
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                <Link to="/">
                    <button type="button" className="btn btn-secondary" style={{ margin: "5px" }}>
                        Volver a Inicio
                    </button>
                </Link>
            </form>
            <p className="text-center mt-4">
                ¿No tienes una cuenta?{" "}
                <Link to="/admin-signup" className="text-primary">Regístrate aquí</Link>
            </p>
        </div>
    );
};
