import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/navbar.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.userLogout();
        setOpen(false);
        navigate("/logoutOk");
    };    

    const toggleMenu = () => {
        setOpen(prevState => !prevState);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
                <div className="container d-flex justify-content-between align-items-center">
                    <Link to="/" className="navbar-brand">
                        <h1 className="text-light">App News</h1>
                    </Link>
                    {store.auth === false && location.pathname === "/" && (
                        <button
                            onClick={() => navigate("/user-login")}
                            className="btn btn-light"
                        >
                            Iniciar Sesión
                        </button>
                    )}
                    {store.auth === true && (
                        <button
                            onClick={toggleMenu}
                            className="btn btn-light"
                        >
                            Menu
                        </button>
                    )}
                </div>
            </nav>

            <div className={`menu ${open ? "open" : "closed"}`}>
                {open && (
                    <>
                        <button
                            aria-label="Close"
                            className="close-button"
                            onClick={toggleMenu}
                        >
                            &times;
                        </button>
                        <div className="menu-container">
                            <button onClick={handleLogout} className="menu-item btn btn-danger">Logout</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
