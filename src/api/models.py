from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    favourites = db.relationship("Favourite", back_populates = "user")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "favourites" : [favourite.serialize()for favourite in self.favourites]
        }

class Favourite(db.Model):
    __tablename__ = 'favourites'
    id = db.Column(db.Integer, primary_key=True)
    api_id = db.Column(db.Integer, unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(80), unique=False, nullable=False)
    image = db.Column(db.String(250), unique=False, nullable=False)
    user = db.relationship("User", back_populates = "favourites")

    def __repr__(self):
        return f'<Favourites {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "api_id": self.api_id,
            "user_id": self.user_id,
            "title": self.title,
            "image": self.image,
        }