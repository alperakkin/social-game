from flask import Flask, session, jsonify
from utilities.sessions import init_session
from utilities.routes import add_routes
from werkzeug.security import generate_password_hash

app = Flask(__name__)
add_routes(app)


@app.route("/")
def index():
    user = session.get('user')
    return jsonify({'msg': 'User is %s' % user})
    

if __name__ == "__main__":
    init_session(app)
    app.run()