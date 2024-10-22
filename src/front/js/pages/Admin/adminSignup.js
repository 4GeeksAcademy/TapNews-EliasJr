import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext"; 
import Swal from "sweetalert2";

export const AdminSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { actions } = useContext(Context);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Solo pasamos email y password a la acción adminSignup
        const result = await actions.adminSignup(email, password);

        if (result.success) {
            Swal.fire({
                position: "center", 
                icon: "success",
                title: "¡Administrador registrado correctamente!",
                showConfirmButton: false,
                timer: 2000,
            });

            setTimeout(() => {
                navigate("/admin-login");
            }, 1500);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.message,
            });
        }
    };

    return (
        <div className="container text-center mt-5">
            <h1>Registro (admin)</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
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
                <button type="submit" className="btn btn-primary">Registrarse</button>
                <Link to="/">
                    <button type="button" className="btn btn-secondary" style={{ margin: "5px" }}>
                        Volver a Inicio
                    </button>
                </Link>
            </form>
            <p className="text-center mt-4">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/admin-login" className="text-primary">Inicia sesión aquí</Link>
            </p>
        </div>
    );
};
