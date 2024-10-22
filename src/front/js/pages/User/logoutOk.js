import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate } from "react-router-dom";
import "../../../styles/index.css";

export const LogoutOk = () => {
    const { store, actions } = useContext(Context);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            setRedirect(true);
        }, 2000);

        return () => clearTimeout(redirectTimeout);
    }, []);

    return (
        <>
            {redirect ? <Navigate to="/" /> : null}
            <div
                className="d-flex justify-content-center align-items-center vh-100 m-5"
                style={{
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)"
                }}
            >
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8">
                            <h2 className="display-6 fw-bold">Closing session...</h2>
                            <h5 className="mb-4">See you soon</h5>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
