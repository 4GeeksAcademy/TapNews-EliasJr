import React from "react";
import ScrollToTop from "./component/scrollToTop";
import injectContext from "./store/appContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { Navbar } from "./component/navbar";
import { UserSignupForm } from "./pages/User/userSignupForm";
import { UserLoginForm } from "./pages/User/userLoginForm";
import { UserPrivatePage } from "./pages/User/userPrivatePage";
import { AdminSignup } from "./pages/Admin/adminSignup";
import { AdmiLogin } from "./pages/Admin/adminLogin";
import { AdminPrivatePage } from "./pages/Admin/adminPrivatePage";
import { SignupOk } from "./pages/User/signupOk";
import { LoginOk } from "./pages/User/loginOk";
import { LogoutOk } from "./pages/User/logoutOk";
import { Author } from "./pages/Author/author";
import { AddAuthor } from "./pages/Author/addAuthor";
import { Category } from "./pages/Category/category";
import { AddCategory } from "./pages/Category/addCategory";
import { Newspaper } from "./pages/Newspaper/newspaper";
import { AddNewspaper } from "./pages/Newspaper/addNewspaper";
import { Article } from "./pages/Article/article";
import { AddArticle } from "./pages/Article/addArticle";
import { EditArticle } from "./pages/Article/editArticle";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<UserSignupForm />} path="/user-signup" />
                        <Route element={<UserLoginForm />} path="/user-login" />
                        <Route element={<UserPrivatePage />} path="/user-private-page" />
                        <Route element={<AdminSignup />} path="/admin-signup" />
                        <Route element={<AdmiLogin />} path="/admin-login" />
                        <Route element={<AdminPrivatePage />} path="/admin-private-page" />
                        <Route element={<SignupOk />} path="/signupok" />
                        <Route element={<LoginOk />} path="/loginok" />
                        <Route element={<LogoutOk />} path="/logoutOk" />
                        <Route element={<Author />} path="/authors" />
                        <Route element={<AddAuthor />} path="/add-author" />
                        <Route element={<Article />} path="/articles" />
                        <Route element={<AddArticle />} path="/add-article" />
                        <Route element={<EditArticle />} path="/edit-article/:id" />
                        <Route element={<Category />} path="/categories" />
                        <Route element={<AddCategory />} path="/add-category" />
                        <Route element={<Newspaper />} path="/newspapers" />
                        <Route element={<AddNewspaper />} path="/add-newspaper" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);