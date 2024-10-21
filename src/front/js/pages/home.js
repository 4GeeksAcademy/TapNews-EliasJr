import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ArticleCard } from "./Article/articleCard";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Article } from "./Article/article";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [visibleArticles, setVisibleArticles] = useState(3);

  useEffect(() => {
    actions.getArticleApiData();
  }, []);

  const loadMoreArticles = () => {
    if (!store.isAuthenticated) {
      Swal.fire({
        title: 'Necesitas registrarte',
        text: "Por favor, regístrate para cargar más artículos.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Registrarse',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/signup';
        }
      });
    } else {
      setVisibleArticles((prevVisible) => prevVisible + 10);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start">
      <div className="container w-100">
        <h1 className="text-center mb-4 text-dark display-4 mt-5">¡HELLO!</h1>
        <p className="text-center mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/user-signup" className="text-primary">
            Regístrate aquí
          </Link>
        </p>
        <h2 className="text-center mt-5">Noticias Recientes</h2>
        <div className="row mt-3">
          {store.articles && store.articles.length > 0 ? (
            store.articles.slice(0, visibleArticles).map((article) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={article.id}>
                <ArticleCard article={article} />
              </div>
            ))
          ) : (
            <p className="text-center">No hay artículos disponibles.</p>
          )}
        </div>
        {visibleArticles < store.articles.length && (
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={loadMoreArticles}>
              Cargar más artículos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
