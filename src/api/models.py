from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)   
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f"<User {self.first_name} {self.last_name}, Email: {self.email}>"

    def serialize(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    articles = db.relationship('Article', backref='category', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<Category {self.name}>"

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }

class UserCategory(db.Model):
    __tablename__ = 'user_categories'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)

    user = db.relationship('User', backref='user_categories')
    category = db.relationship('Category', backref='user_categories')

    def __repr__(self):
        return f"<UserCategory User ID: {self.user_id}, Category ID: {self.category_id}>"

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'category_id': self.category_id,
        }

class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    photo = db.Column(db.String(255))

    articles = db.relationship('Article', backref='author', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<Author {self.name}>"

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'photo': self.photo
        }

class Newspaper(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    logo = db.Column(db.String(255))
    link = db.Column(db.String(255))

    articles = db.relationship('Article', backref='newspaper', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<Newspaper {self.name}>"

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'logo': self.logo,
            'link': self.link
        }

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(1024))  
    content = db.Column(db.Text)
    image = db.Column(db.String(1024)) 
    published_date = db.Column(db.DateTime)
    source = db.Column(db.String(1024))  
    link = db.Column(db.String(1024))
    
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))
    newspaper_id = db.Column(db.Integer, db.ForeignKey('newspaper.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))

    def __repr__(self):
        return f"<Article {self.title}>"

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'image': self.image,
            'published_date': self.published_date.isoformat() if self.published_date else None,
            'source': self.source,
            'link': self.link,
            'author': self.author.serialize() if self.author else None,
            'newspaper': self.newspaper.serialize() if self.newspaper else None,
            'category': self.category.serialize() if self.category else None
        }

class CategoryArticles(db.Model):
    __tablename__ = 'category_articles'
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    article_id = db.Column(db.Integer, db.ForeignKey('article.id'), nullable=False)

    category = db.relationship('Category', backref='category_articles')
    article = db.relationship('Article', backref='category_articles')

    def __repr__(self):
        return f"<CategoryArticle Category ID: {self.category_id}, Article ID: {self.article_id}>"

    def serialize(self):
        return {
            'id': self.id,
            'category_id': self.category_id,
            'article_id': self.article_id,
        }

class FavoriteArticle(db.Model):
    __tablename__ = 'favorite_articles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    article_id = db.Column(db.Integer, db.ForeignKey('article.id'), nullable=False)

    user = db.relationship('User', backref='favorite_articles')
    article = db.relationship('Article', backref='favorite_articles')

    def __repr__(self):
        return f"<FavoriteArticle User ID: {self.user_id}, Article ID: {self.article_id}>"

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'article_id': self.article_id,
            'article': self.article.serialize() if self.article else None,
        }

class Administrator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Administrator {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }
