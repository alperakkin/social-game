from api.login import login
from api.register import register


def add_routes(app):
    app.register_blueprint(login, url_prefix='/login')
    app.register_blueprint(register, url_prefix='/register')
