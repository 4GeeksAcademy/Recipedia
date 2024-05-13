"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# @api.route('/token', methods=['POST'])
# def create_token():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     user = User.query.filter_by(username=username).first()
#     if user and user.check_password(password):
#         access_token = create_access_token(identity=username)
#         return jsonify(access_token=access_token), 200
#     else:
#         return jsonify({'msg': 'Invalid username or password'}), 401
#     if not user:
#         return jsonify({"msg": "Invalid username or password"}), 401
    
#     access_token = create_access_token(identity=username)
#     return jsonify(access_token=access_token)

@api.route('/signup', methods = ['POST'])
def signup():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = Users.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "Email already exists"})

    new_user = Users(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@api.route('/login', methods = ['POST'])
def login():
    email = request.json["email"]
    password = request.json["password"]

    user = Users.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"Wrong email or password"}), 401
    # if not email or not password:
    #     return jsonify({"error": "Email or password missing"}), 400
    
    # user = Users.query.filter_by(email=email).first()

    # if user is None:
    #     return jsonify({"error": "This is not a registered account"}), 401
    # if user.password is not password:
    #     return jsonify({"error": "Wrong password"}), 401

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    user = Users.query.filter_by(id=current_user).first()

    if not user:
        return jsonify(success=False, message='User not found'), 404
    
    response_body = {
        "logged_in_as": current_user,
        "user": user.serialize()
    }

    return jsonify(success=True, response=response_body), 200
        

    
        
