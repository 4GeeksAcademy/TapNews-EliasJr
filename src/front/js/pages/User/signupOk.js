import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { Navigate } from "react-router-dom";
import "../../../styles/index.css";

export const SignupOk = () => {
    const { store } = useContext(Context);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            setRedirect(true);
        }, 2000);

        return () => clearTimeout(redirectTimeout);
    }, []);

    return (
        <>
            {redirect ? <Navigate to="/user-login" /> : null}
            <div
                className="d-flex justify-content-center align-items-center vh-50"
            >
                <div className="container text-center">
                    <div className="row align-items-start mt-5">
                        <div className="col-12">
                            <div className="card p-4 shadow-sm">
                                <h2 className="display-6 fw-bold">Registro realizado correctamente</h2>
                                <h5 className="mb-4">Espere, por favor...</h5>
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
