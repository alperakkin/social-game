from flask import Blueprint, request, current_app

from utilities.sessions import (check_password, hash_password, token_required,
                                create_token, validate_token_by_user)
from utilities.responses import response_msg
from utilities import database
from db.models import db
from db.models.user_model import Users


login = Blueprint('login', __name__)
logout = Blueprint('logout', __name__)
register = Blueprint('register', __name__)
delete = Blueprint('delete', __name__)


@login.route('/', methods=['POST'])
def login_method():
    if not request.authorization:
        return response_msg('Auth rejected', 401)
    username = request.authorization.get('username')
    password = request.authorization.get('password')

    if not all([username, password]):
        return response_msg('Username or password is empty', 403)
 
    res = database.query(db, Users, username=username)

    if not res:
        return response_msg('User not exists', 403)

    user = res[0]

    if len(res) == 1 and check_password(user.password, password):
        return response_msg({'token': create_token(current_app,
                             username)})
    return response_msg("Login not permitted", 403)


@logout.route('/', methods=['POST'])
@token_required
def logout_method():
    return response_msg('User Logged Out')


@delete.route('/', methods=['DELETE'])
@token_required
def delete_method():
    username = validate_token_by_user()
    if username and request.method == 'DELETE':
        database.delete(db, Users, username=username)
        return response_msg('User %s is deleted' % username)
    return response_msg('User not found', 401)


@register.route('/', methods=['POST'])
def register_method():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    confirmation = request.json.get('confirmation')
    if not all([username, email, password, confirmation]):
        return response_msg('There are empty fields', 403)
    if password != confirmation:
        return response_msg('Password Confirmation is incorrect', 403)

    res = database.query(db, Users, username=username)

    if res:
        return response_msg('Username already exists', 403)
   
    database.create(db, Users, username=username, email=email,
                    password=hash_password(password))

    res = database.query(db, Users, username=username)
    if res:
        return response_msg({'token': create_token(current_app, username)})
    return response_msg('User can not be registered', 403)
