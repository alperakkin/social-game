from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import SECRET_KEY, DB_URI

db = SQLAlchemy()


def create_app(logger_override=None):
    from utilities.routes import add_routes
    app = Flask(__name__)
    if logger_override:
        app.logger.handlers = logger_override.handlers
        app.logger.setLevel(logger_override.level)
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.config["SECRET_KEY"] = SECRET_KEY
    app.config["SQLALCHEMY_DATABASE_URI"] = DB_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config['CORS_HEADERS'] = 'Content-Type'
    add_routes(app)
    db.init_app(app)

    with app.app_context():
        db.create_all()
        return app
