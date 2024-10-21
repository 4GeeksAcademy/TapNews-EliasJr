"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Category, UserCategory, Author, Newspaper, Article, FavoriteArticle, Administrator
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from werkzeug.security import generate_password_hash, check_password_hash

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import requests

api = Blueprint('api', __name__)

CORS(api)


############# C.R.U.D USER ##############

@api.route('/user', methods=['GET'])
def get_users():
    users = User.query.all()
    resultados = list(map(lambda item: item.serialize(), users))

    if not users:
        return jsonify(message="No se han encontrado usuarios"), 404

    return jsonify(resultados), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user_id(user_id):
    user = User.query.get(user_id)

    if user is None:
        return jsonify(message="Usuario no encontrado"), 404

    return jsonify(user.serialize()), 200

@api.route('/user', methods=['POST'])
def add_new_user():
    request_body_user = request.get_json()
    if (
        "first_name" not in request_body_user
        or "last_name" not in request_body_user
        or "email" not in request_body_user
        or "password" not in request_body_user
    ):
        return jsonify({"error": "Datos incompletos"}), 400


    existing_user = User.query.filter_by(email=request_body_user["email"]).first()
    if existing_user:
        return jsonify({"error": "El correo ya está registrado"}), 400

    hashed_password = generate_password_hash(request_body_user["password"])

    new_user = User(
        first_name=request_body_user["first_name"],
        last_name=request_body_user["last_name"],
        email=request_body_user["email"],
        password=hashed_password,
    )

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

    response_body = {
        "msg": "Nuevo usuario añadido correctamente"
    }

    return jsonify(response_body), 201

@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    request_body_user = request.get_json()

    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'message': "Usuario no encontrado"}), 404

    if "first_name" in request_body_user:
        user.first_name = request_body_user["first_name"]
    if "last_name" in request_body_user:
        user.last_name = request_body_user["last_name"]
    if "email" in request_body_user:
        existing_user = User.query.filter_by(email=request_body_user["email"]).first()
        if existing_user and existing_user.id != user_id:
            return jsonify({"error": "El correo ya está en uso por otro usuario"}), 400
        user.email = request_body_user["email"]
    if "password" in request_body_user:
        user.password = generate_password_hash(request_body_user["password"])
    db.session.commit()

    return jsonify({'message': f'Usuario con id {user_id} ha sido actualizado correctamente'}), 200

@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'message': "Usuario no encontrado"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': f'Usuario con id {user_id} ha sido borrado'}), 200

############# C.R.U.D ADMIN ##############

@api.route('/administrator', methods=['GET'])
def get_administrator():
    administrators = Administrator.query.all()
    resultados = list(map(lambda item: item.serialize(), administrators))

    if not administrators:
        return jsonify(message="No se han encontrado usuarios"), 404

    return jsonify(resultados), 200

@api.route('/administrator/<int:administrator_id>', methods=['GET'])
def get_administrator2(administrator_id):
    administrator = Administrator.query.get(administrator_id)

    if administrator is None:
        return jsonify(message="Usuario no encontrado"), 404

    return jsonify(administrator.serialize()), 200

@api.route('/administrator', methods=['POST'])
def add_new_administrator():
    request_body_administrator = request.get_json()

    if (
        "first_name" not in request_body_administrator
        or "last_name" not in request_body_administrator
        or "email" not in request_body_administrator
        or "password" not in request_body_administrator
    ):
        return jsonify({"error": "Datos incompletos"}), 400

    existing_administrator = Administrator.query.filter_by(email=request_body_administrator["email"]).first()
    if existing_administrator:
        return jsonify({"error": "El correo ya está registrado"}), 400

    hashed_password = bcrypt.generate_password_hash(request_body_administrator["password"]).decode('utf-8')

    new_administrator = Administrator(
        first_name=request_body_administrator["first_name"],
        last_name=request_body_administrator["last_name"],
        email=request_body_administrator["email"],
        password=hashed_password,
    )

    try:
        db.session.add(new_administrator)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

    response_body = {
        "msg": "Nuevo usuario añadido correctamente"
    }

    return jsonify(response_body), 201

@api.route('/administrator/<int:administrator_id>', methods=['PUT'])
def update_administrator(administrator_id):
    request_body_administrator = request.get_json()

    administrator = Administrator.query.get(administrator_id)
    
    if not administrator:
        return jsonify({'message': "Usuario no encontrado"}), 404

    if "first_name" in request_body_administrator:
        administrator.first_name = request_body_administrator["first_name"]
    if "last_name" in request_body_administrator:
        administrator.last_name = request_body_administrator["last_name"]
    if "email" in request_body_administrator:
        existing_administrator = Administrator.query.filter_by(email=request_body_administrator["email"]).first()
        if existing_administrator and existing_administrator.id != administrator_id:
            return jsonify({"error": "El correo ya está en uso por otro usuario"}), 400
        administrator.email = request_body_administrator["email"]
    if "password" in request_body_administrator:
        administrator.password = bcrypt.generate_password_hash(request_body_administrator["password"]).decode('utf-8')

    db.session.commit()

    return jsonify({'message': f'Usuario con id {administrator_id} ha sido actualizado correctamente'}), 200

@api.route('/administrator/<int:administrator_id>', methods=['DELETE'])
def delete_administrator(administrator_id):
    administrator = Administrator.query.get(administrator_id)

    if not administrator:
        return jsonify({'message': "Usuario no encontrado"}), 404

    db.session.delete(administrator)
    db.session.commit()

    return jsonify({'message': f'Usuario con id {administrator_id} ha sido borrado'}), 200

######## USER LOGIN-SIGNUP ########

@api.route('/user-signup', methods=['POST'])
def signup():
    body = request.get_json()
    user = User.query.filter_by(email=body["email"]).first()

    if user is None:
        user = User(first_name=["firstName"], last_name=["lastName"], email=body["email"], password=body["password"] )
        db.session.add(user)
        db.session.commit()
        response_body = {
            "msg": "Usuario creado correctamente"
        }
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "El correo electrónico ya está registrado"}), 400
    
@api.route("/user-login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user == None:
        return jsonify({"msg" : "Incorrect email or password"}), 401
    if user.password != password:
        return jsonify({"msg": "Incorrect email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

############# ADMIN LOGIN-SIGNUP ##############

@api.route('/admin-Signup', methods=['POST'])
def administratorSignup():
    request_body_administrator = request.get_json()

    if (
        "first_name" not in request_body_administrator
        or "last_name" not in request_body_administrator
        or "email" not in request_body_administrator
        or "password" not in request_body_administrator
    ):
        return jsonify({"error": "Datos incompletos"}), 400

    existing_administrator = Administrator.query.filter_by(email=request_body_administrator["email"]).first()
    if existing_administrator:
        return jsonify({"error": "El correo ya está registrado"}), 400

    hashed_password = bcrypt.generate_password_hash(request_body_administrator["password"]).decode('utf-8')

    new_administrator = Administrator(
        first_name=request_body_administrator["first_name"],
        last_name=request_body_administrator["last_name"],
        email=request_body_administrator["email"],
        password=hashed_password,
    )

    try:
        db.session.add(new_administrator)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

    response_body = {
        "msg": "Nuevo usuario añadido correctamente"
    }

    return jsonify(response_body), 201

@api.route('/admin-Login', methods=['POST'])
def administratorLogin():
    request_body_administrator = request.get_json()

    if "email" not in request_body_administrator or "password" not in request_body_administrator:
        return jsonify({"error": "Correo y contraseña son requeridos"}), 400

    administrator = Administrator.query.filter_by(email=request_body_administrator["email"]).first()

    if not administrator or not bcrypt.check_password_hash(administrator.password, request_body_administrator["password"]):
        return jsonify({"error": "Correo o contraseña incorrectos"}), 401

    access_token = create_access_token(identity=administrator.id)

    return jsonify(access_token=access_token), 200


############# C.R.U.D CATEGORY ##############

@api.route('/category', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    resultados = list(map(lambda item: item.serialize(), categories))

    if not categories:
        return jsonify(message="No se han encontrado categorías"), 404

    return jsonify(resultados), 200

@api.route('/category/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = Category.query.get(category_id)

    if category is None:
        return jsonify(message="Categoría no encontrada"), 404

    return jsonify(category.serialize()), 200

@api.route('/category', methods=['POST'])
def add_new_category():
    request_body_category = request.get_json()

    if "name" not in request_body_category:
        return jsonify({"error": "El nombre de la categoría es obligatorio"}), 400

    new_category = Category(
        name=request_body_category["name"],
        description=request_body_category.get("description", None)
    )

    db.session.add(new_category)
    db.session.commit()

    response_body = {
        "msg": "Nueva categoría añadida correctamente"
    }

    return jsonify(response_body), 201

@api.route('/category/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    request_body_category = request.get_json()

    category = Category.query.get(category_id)
    
    if not category:
        return jsonify({'message': "Categoría no encontrada"}), 404

    if "name" in request_body_category:
        category.name = request_body_category["name"]
    if "description" in request_body_category:
        category.description = request_body_category["description"]

    db.session.commit()

    return jsonify({'message': f'Categoría con id {category_id} ha sido actualizada correctamente'}), 200

@api.route('/category/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    category = Category.query.get(category_id)

    if not category:
        return jsonify({'message': "Categoría no encontrada"}), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({'message': f'Categoría con id {category_id} ha sido borrada'}), 200

############# C.R.U.D USER CATEGORY ##############

@api.route('/user-category', methods=['GET'])
@jwt_required()
def get_user_categories():
    user_categories = UserCategory.query.all()
    results = list(map(lambda item: item.serialize(), user_categories))
    
    if not results:
        return jsonify(message="No se han encontrado relaciones entre usuarios y categorías"), 404

    return jsonify(results), 200

@api.route('/user-category/<int:user_id>', methods=['GET'])
def get_user_categories_by_user(user_id):
    user_categories = UserCategory.query.filter_by(user_id=user_id).all()
    
    if not user_categories:
        return jsonify(message="No se han encontrado categorías para este usuario"), 404

    results = list(map(lambda item: item.serialize(), user_categories))
    return jsonify(results), 200

@api.route('/user-category', methods=['POST'])
def add_user_category():
    request_body = request.get_json()

    if "user_id" not in request_body or "category_id" not in request_body:
        return jsonify({"error": "Datos incompletos, se necesita user_id y category_id"}), 400

    new_user_category = UserCategory(
        user_id=request_body["user_id"],
        category_id=request_body["category_id"]
    )

    db.session.add(new_user_category)
    db.session.commit()

    return jsonify({"msg": "Relación entre usuario y categoría añadida correctamente"}), 200

@api.route('/user-category/<int:user_category_id>', methods=['DELETE'])
def delete_user_category(user_category_id):
    user_category = UserCategory.query.get(user_category_id)

    if not user_category:
        return jsonify({'message': "Relación no encontrada"}), 404

    db.session.delete(user_category)
    db.session.commit()

    return jsonify({'message': f'Relación con id {user_category_id} ha sido eliminada'}), 200

############# C.R.U.D AUTHOR ##############

@api.route('/author', methods=['GET'])
def get_author():
    all_authors = Author.query.all()
    authors = list(map(lambda character: character.serialize(), all_authors))
    return jsonify(authors), 200

@api.route('/author/<int:author_id>', methods=['GET'])
def get_author_by_id(author_id):
    author = Author.query.filter_by(id=author_id).first()

    if author is None:
        return jsonify({"error": "author not found"}), 404

    return jsonify(author.serialize()), 200

@api.route('/author', methods=['POST'])
def post_author():
    body = request.get_json()

    if not body:
        return jsonify({'error': 'Request body must be JSON'}), 400

    if 'name' not in body:
        return jsonify({'error': 'Name is required'}), 400
    if 'description' not in body:
        return jsonify({'error': 'Description is required'}), 400
    if 'photo' not in body:
        return jsonify({'error': 'Photo is required'}), 400

    if body['name'] == '':
        return jsonify({'error': 'Name cannot be empty'}), 400

    author = Author(**body)
    try:
        db.session.add(author)
        db.session.commit()
        return jsonify({'message': 'Author created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/author/<int:author_id>', methods=['DELETE'])
def delete_author_by_id(author_id):
    author = Author.query.filter_by(id=author_id).first()

    if author is None:
        return jsonify({"error": "author not found"}), 404

    db.session.delete(author)
    db.session.commit()

    return jsonify(author.serialize()), 200

@api.route('/author/<int:author_id>', methods=['PUT'])
def update_author(author_id):
    request_body_author = request.get_json()

    author = Author.query.get(author_id)

    if not author:
        return jsonify({'message': "Autor no encontrado"}), 404

    if "name" in request_body_author:
        author.name = request_body_author["name"]
    if "description" in request_body_author:
        author.description = request_body_author["description"]
    if "photo" in request_body_author:
        author.photo = request_body_author["photo"]

    db.session.commit()

    return jsonify({'message': f'Autor con id {author_id} ha sido actualizado correctamente'}), 200

############# C.R.U.D NEWSPAPER ##############

@api.route('/newspaper', methods=['GET'])
def get_newspaper():
    all_newspapers = Newspaper.query.all()
    newspapers = list(map(lambda character: character.serialize(),all_newspapers))
    return jsonify(newspapers), 200

@api.route('/newspaper/<int:newspaper_id>', methods=['GET'])
def get_newspaper_by_id(newspaper_id):
    newspaper = Newspaper.query.filter_by(id=newspaper_id).first()

    if newspaper is None:
        return jsonify({"error": "newspaper not found"}), 404

    return jsonify(newspaper.serialize()), 200

@api.route('/newspaper', methods=['POST'])
def post_newspaper():
    body = request.get_json()

    if not body:
        return jsonify({'error': 'Request body must be JSON'}), 400

    if 'name' not in body:
        return jsonify({'error': 'Name is required'}), 400
    if 'description' not in body:
        return jsonify({'error': 'Description is required'}), 400
    if 'logo' not in body:
        return jsonify({'error': 'Logo is required'}), 400
    if 'link' not in body:
        return jsonify({'error': 'Link is required'}), 400
    
    if body['name'] == '':
        return jsonify({'error': 'Name cannot be empty'}), 400
    
    newspaper = Newspaper(**body)
    try:
        db.session.add(newspaper)
        db.session.commit()
        return jsonify({'message': 'Newspaper created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/newspaper/<int:newspaper_id>', methods=['DELETE'])
def delete_newspaper_by_id(newspaper_id):
    newspaper = Newspaper.query.filter_by(id=newspaper_id).first()

    if newspaper is None:
        return jsonify({"error": "newspaper not found"}), 404
    
    db.session.delete(newspaper)
    db.session.commit()

    return jsonify(newspaper.serialize()), 200

@api.route('/newspaper/<int:newspaper_id>', methods=['PUT'])
def update_newspaper(newspaper_id):
    request_body_newspaper = request.get_json()

    newspaper = Newspaper.query.get(newspaper_id)

    if not newspaper:
        return jsonify({'message': "Usuario no encontrado"}), 404

    if "name" in request_body_newspaper:
        newspaper.name = request_body_newspaper["name"]
    if "description" in request_body_newspaper:
        newspaper.description = request_body_newspaper["description"]
    if "logo" in request_body_newspaper:
        newspaper.logo = request_body_newspaper["logo"]
    if "link" in request_body_newspaper:
        newspaper.link = request_body_newspaper["link"]
        
        db.session.commit()

    return jsonify({'message': f'Usuario con id {newspaper_id} ha sido actualizado correctamente'}), 200


############# C.R.U.D ARTICLE ##############

@api.route('/article', methods=['GET'])
def get_article():
    all_articles = Article.query.all()
    articles = list(map(lambda article: article.serialize(), all_articles))
    return jsonify(articles), 200

@api.route('/category/<int:category_id>/article', methods=['GET'])
def get_articles_by_category(category_id):
    category = Category.query.get(category_id)
    if category is None:
        return jsonify({'error': 'Categoría no encontrada'}), 404

    articles = Article.query.filter_by(category_id=category.id).all()
    return jsonify([article.serialize() for article in articles]), 200

@api.route('/article/<int:article_id>', methods=['GET'])
def get_article_by_id(article_id):
    article = Article.query.filter_by(id=article_id).first()

    if article is None:
        return jsonify({"error": "article not found"}), 404

    return jsonify(article.serialize()), 200

@api.route('/article', methods=['POST'])
def create_article():
    try:
        data = request.get_json()
        if not all(key in data for key in ('title', 'content', 'author_id', 'newspaper_id', 'category_id')):
            return jsonify({'error': 'Faltan datos requeridos.'}), 400

        new_article = Article(
            title=data['title'],
            content=data['content'],
            image=data.get('image'),
            published_date=data.get('published_date'),
            source=data.get('source'),
            link=data.get('link'),
            author_id=data['author_id'],
            newspaper_id=data['newspaper_id'],
            category_id=data['category_id']
        )
        db.session.add(new_article)
        db.session.commit()
        return jsonify(new_article.serialize()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/article/<int:article_id>', methods=['DELETE'])
def delete_article_by_id(article_id):
    article = Article.query.filter_by(id=article_id).first()

    if article is None:
        return jsonify({"error": "article not found"}), 404

    db.session.delete(article)
    db.session.commit()
    db.session.close()

    return jsonify(article.serialize()), 200

@api.route('/article/<int:article_id>', methods=['PUT'])
def update_article(article_id):
    request_body_article = request.get_json()
    article = Article.query.get(article_id)
    
    if not article:
        return jsonify({'message': "article no encontrado"}), 404

    try:
        if 'title' in request_body_article:
            article.title = request_body_article['title']
        if 'content' in request_body_article:
            article.content = request_body_article['content']
        if 'image' in request_body_article:
            article.image = request_body_article['image']
        if 'published_date' in request_body_article:
            article.published_date = request_body_article['published_date']
        if 'source' in request_body_article:
            article.source = request_body_article['source']
        if 'link' in request_body_article:
            article.link = request_body_article['link']
        if 'author_id' in request_body_article:
            article.author_id = request_body_article['author_id']
        if 'newspaper_id' in request_body_article:
            article.newspaper_id = request_body_article['newspaper_id']
        if 'category_id' in request_body_article:
            article.category_id = request_body_article['category_id']

        db.session.commit()
        return jsonify({'message': f'article con id {article_id} ha sido actualizado correctamente'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

######## FAVORITES - ARTICLES ########

@api.route('/favorites', methods=['GET'])
def get_favorites_articles():
    favorites = FavoriteArticle.query.all()
    favorite_articles = [favorite.serialize() for favorite in favorites]

    return jsonify(favorite_articles), 200

@api.route('/favorites/<int:article_id>', methods=['GET'])
def get_favorite_article_by_id(article_id):
    favorite = FavoriteArticle.query.filter_by(article_id=article_id).first()

    if favorite:
        return jsonify(favorite.serialize()), 200

    return jsonify({'message': 'Favorite not found.'}), 404


@api.route('/favorites', methods=['POST'])
def add_favorite():
    try:
        article_id = request.json.get('article_id')
        user_id = request.json.get('user_id')

        if not article_id or not user_id:
            return jsonify({'message': 'Article ID and User ID are required.'}), 400
        
        existing_favorite = FavoriteArticle.query.filter_by(user_id=user_id, article_id=article_id).first()
        if existing_favorite:
            return jsonify({'message': 'Article is already in favorites.'}), 409

        favorite = FavoriteArticle(user_id=user_id, article_id=article_id)
        db.session.add(favorite)
        db.session.commit()

        return jsonify({'message': 'Article added to favorites.'}), 201

    except Exception as e:
        db.session.rollback() 
        return jsonify({'message': str(e)}), 500

@api.route('/favorites/<int:article_id>', methods=['DELETE'])
def remove_favorite(article_id):
    favorite = FavoriteArticle.query.filter_by(article_id=article_id).first()

    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({'message': 'Article removed from favorites.'}), 200

    return jsonify({'message': 'Favorite not found.'}), 404

######## USER-ADMIN PRIVATE-PAGE########

@api.route("/user-private-page", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@api.route('/admin-private-page', methods=['GET'])
@jwt_required()
def administratorhomepage():
    return jsonify(message="Bienvenido a la página principal"), 200

@api.route('/load-api-articles', methods=['GET'])
def load_api_articles():
    try:
        response = requests.get('https://newsapi.org/v2/top-headlines', params={
            'q': 'tesla',
            'sortBy': 'publishedAt',
            'apiKey': '078875a9809746b1ac17d25705f7991d'
        })

        print("Estado de la respuesta de la API externa:", response.status_code)
        print("Contenido de la respuesta de la API externa:", response.text)

        if response.status_code != 200:
            return jsonify({'error': 'Error al obtener datos de la API externa'}), 500

        data = response.json()
        # import pdb
        # pdb.set_trace()
        for article in data.get('articles', []):
            title = article.get('title')
            description = article.get('description')
            url_to_image = article.get('urlToImage')
            published_at = article.get('publishedAt')
            url = article.get('url')

            author_name = article.get('author')
            source_name = article.get('source', {}).get('name')

            if not all([title, description, url_to_image, url, author_name, source_name, published_at]):
                print(f"Artículo ignorado por falta de datos: {article}")
                continue

            title = title[:255]
            description = description[:65535]
            url_to_image = url_to_image[:255]
            url = url[:255]
            author_name = author_name[:100]
            source_name = source_name[:255]

            existing_article = Article.query.filter_by(title=title, source=url).first()
            if existing_article:
                print(f"Artículo ya existe en la base de datos: {title}")
                continue

            author = Author.query.filter_by(name=author_name).first()
            if not author:
                author = Author(name=author_name, description=None, photo=None)
                db.session.add(author)
                db.session.flush() 

            newspaper = Newspaper.query.filter_by(name=source_name).first()
            if not newspaper:
                newspaper = Newspaper(name=source_name)
                db.session.add(newspaper)
                db.session.flush() 

            new_article = Article(
                title=title,
                content=description,
                image=url_to_image,
                published_date=published_at,
                source=url,
                link=url,
                author_id=author.id,
                newspaper_id=newspaper.id,
                category_id=1
            )

            db.session.add(new_article)

        db.session.commit()
        return jsonify(message="Artículos creados exitosamente"), 201

    except Exception as e:
        db.session.rollback() 
        print(f"Error al procesar la solicitud: {str(e)}")
        return jsonify({'error': 'Error al procesar la solicitud: ' + str(e)}), 500


if __name__ == "__main__":
    api.run()