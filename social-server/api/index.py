from flask import Blueprint
from utilities.sessions import (token_required, validate_token_by_user)
from utilities.responses import response_msg
home = Blueprint('home', __name__)


@home.route('/', methods=['GET'])
@token_required
def index():
    user = validate_token_by_user()
    return response_msg(user)