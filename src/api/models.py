from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
        return uuid4().hex

class Users(db.Model):
    __tablename__="users"
    id = db.Column(db.Text, primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Users {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
