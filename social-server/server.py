from flask import Flask, session
from utilities.sessions import init_session
from utilities.routes import add_routes
from utilities.database import execute_query
from utilities.responses import response_msg

app = Flask(__name__)
add_routes(app)


@app.route("/api")
def index():
    user_id = session.get('user_id')
    if not user_id:
        return response_msg('Please Log In', 403)
    user = execute_query("SELECT * FROM users WHERE id=?", user_id)[0]
    user.pop('password')
    return response_msg(user)


if __name__ == "__main__":
    init_session(app)
    app.run()