from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import SECRET_KEY, DB_URI


db = SQLAlchemy()


def create_app():
    from utilities.routes import add_routes
    app = Flask(__name__, instance_relative_config=False)
    app.config["SECRET_KEY"] = SECRET_KEY
    app.config["SQLALCHEMY_DATABASE_URI"] = DB_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    CORS(app)
    add_routes(app)
    db.init_app(app)

    with app.app_context():
        db.create_all()
        return app
