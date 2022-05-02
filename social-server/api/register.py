from flask import Blueprint, request
from utilities.database import execute_query
from werkzeug.security import generate_password_hash

register = Blueprint('register', __name__)


@register.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirmation = request.form.get('confirmation')
        if not all([username, email, password, confirmation]):
            return "There are empty fields",403
        if password != confirmation:
            return "Password and Confirmation fields not matched",403

        execute_query("INSERT INTO users (username,email,password) VALUES (?,?,?)",
                      username, email, generate_password_hash(password))
        return "This is an register app"
