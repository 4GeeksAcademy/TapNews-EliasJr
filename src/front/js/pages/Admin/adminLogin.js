import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

export const AdmiLogin = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actions.administratorLogin({ email, password });
            console.log("Login successful");

            navigate("/AdministratorHomePage"); 
        } catch (error) {
            console.error("Login error:", error);
            alert("Login error. Please check your credentials.");
        }
    };

    return (
        <div className="container mt-5 bg-black w-25">
            <h2 className="text-center text-white">Login</h2>
            <form onSubmit={handleSubmit} className="mt-4 bg-dark p-4 rounded">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white">Email</label>
                    <input
                        type="email"
                        className="form-control bg-dark text-white border-light"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label text-white">Password</label>
                    <input
                        type="password"
                        className="form-control bg-dark text-white border-light"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className="mt-3 text-center text-white">
                Don't have an account?{" "}
                <Link to="/administratorRegister" className="text-primary">Register here</Link>
            </p>
        </div>
    );
};
