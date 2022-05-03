from api.users import login, logout, register


def add_routes(app):
    app.register_blueprint(login, url_prefix='/api/login')
    app.register_blueprint(logout, url_prefix='/api/logout')
    app.register_blueprint(register, url_prefix='/api/register')
