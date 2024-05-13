
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def signup():
    request_body = request.get_json(force=True)

    required_fields = ["email", "password"]
    for field in required_fields:
        if field not in request_body or not request_body[field]:
            raise APIException(f'The "{field}" field cannot be empty', 400)

    verify_email = User.query.filter_by(email=request_body["email"]).first()
    if verify_email:
        raise APIException("An account with this email already exists", 400)

    user = User(email=request_body["email"], password=request_body["password"],is_active=True)

    db.session.add(user)

    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "Successfully created user",
        "user": user.serialize()
    }

    return jsonify(response_body), 200

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
        

    
        
