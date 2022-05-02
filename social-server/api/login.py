from flask import Blueprint, request
login = Blueprint('login', __name__)


@login.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return "This is an login app"
    return "TODO Login will be defined"
