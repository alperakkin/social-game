import jwt
from werkzeug.security import check_password_hash, generate_password_hash
from flask import current_app, request
from functools import wraps
from utilities.responses import response_msg
from utilities import database
from db.models.user_model import db, Users
from datetime import datetime, timedelta
from config import SESSION_TIMEOUT


def hash_password(password):
    return generate_password_hash(password)


def check_password(hashed, requested):
    return check_password_hash(hashed, requested)


def create_token(app, user):
    token = jwt.encode({
        'user': user,
        'exp': datetime.utcnow() + timedelta(minutes=SESSION_TIMEOUT)},
        app.config.get('SECRET_KEY'))
    return token


def validate_token_by_user():
    token = request.headers.get('Authorization')
    if not token:
        return False
    try:
        token = token.split('Bearer')[1].strip()
        token_data = jwt.decode(token, current_app.config['SECRET_KEY'],
                                algorithms=['HS256'])
        
        res = database.query(db, Users, username=token_data['user'])

        if res and len(res) == 1:
            return token_data['user']
        return False
    except Exception:
        return False


def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not validate_token_by_user():
            return response_msg('invalidtoken', 401)
        return f(*args, **kwargs)
    return decorated_function
