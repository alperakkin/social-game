from flask import Flask, session
from flask_cors import CORS
from utilities.sessions import init_session, login_required
from utilities.routes import add_routes
from utilities.database import execute_query
from utilities.responses import response_msg

app = Flask(__name__)
CORS(app)
add_routes(app)


@app.route("/api")
@login_required
def index():
    user = execute_query("SELECT * FROM users WHERE id=?",
                         session.get('user_id'))[0]
    user.pop('password')
    return response_msg(user)


if __name__ == "__main__":
    init_session(app)
    app.run()