import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { CardArticle } from "../Article/cardArticle";
import { Link } from "react-router-dom";

export const AdminPrivatePage = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/admin-login");
        } else {
            actions.getArticles();
            actions.loadCategories();
            actions.loadAuthors();
            actions.getNewspapers();
        }
    }, []);

    return (
        <div className="container-fluid mt-5 p-4">
            <h1 className="text-center">Perfil ADMINISTRADOR</h1>

            {showFilters && (
                <div className="my-4 text-center">
                    <button onClick={() => setSelectedCategories([])} className="btn btn-primary mx-2">Todas</button>
                    {store.categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryChange(category.name)}
                            className={`btn mx-2 ${selectedCategories.includes(category.name) ? "btn-primary" : "btn-primary"}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            )}
            <div className="text-center my-4">
                <Link to="/authors" className="btn btn-primary mx-2">Ver autores</Link>
                <Link to="/newspapers" className="btn btn-primary mx-2">Ver Periódicos</Link>
                <Link to="/categories" className="btn btn-primary mx-2">Ver Categorías</Link>
                <Link to="/articles" className="btn btn-primary mx-2">Ver Artículos</Link>
            </div>
        </div>
    );
};
