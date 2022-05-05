from flask import session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from functools import wraps
from utilities.responses import response_msg


def init_session(app):
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem"
    Session(app)


def hash_password(password):
    return generate_password_hash(password)


def check_password(hashed, requested):
    return check_password_hash(hashed, requested)


def create_session(user_id):
    session['user_id'] = user_id


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get('user_id')
        if not user_id:
            return response_msg('login_error', 403)
        return f(*args, **kwargs)
    return decorated_function
