from flask import session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash


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