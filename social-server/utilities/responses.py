from flask import jsonify


def response_msg(msg, status_code=200):
    return jsonify({'msg': msg}), status_code