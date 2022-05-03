from flask import Blueprint, request, session

from utilities.sessions import check_password, create_session, hash_password
from utilities.responses import response_msg
from utilities.database import execute_query

login = Blueprint('login', __name__)
logout = Blueprint('logout', __name__)
register = Blueprint('register', __name__)


@login.route('/', methods=['POST'])
def login_method():
    session.clear()
    username = request.json.get('username')
    password = request.json.get('password')

    if not all([username, password]):
        return response_msg('Username or password is empty', 403)

    res = execute_query('SELECT * FROM users WHERE username=?', username)

    if not res:
        return response_msg('User not exists', 403)

    user = res[0]
    if len(res) == 1 and check_password(user['password'], password):
        create_session(user["id"])
        return response_msg('User Logged In')
    return ("Login not permitted", 403)


@logout.route('/', methods=['POST'])
def logout_method():
    session.clear()
    return response_msg('User Logged Out')


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
    
    res = execute_query('SELECT * FROM users WHERE username=?', username)

    if res:
        return response_msg('Username already exists', 403)
    execute_query("INSERT INTO users (username,email,password) VALUES (?,?,?)",
                  username, email, hash_password(password))
    return response_msg('User is registered')
