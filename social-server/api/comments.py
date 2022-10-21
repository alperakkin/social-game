
import logging
from flask import Blueprint, request

from utilities.sessions import (token_required, validate_token_by_user)
from utilities.responses import response_msg
from utilities import database

from db.models import db
from db.models.user_model import Users, Profiles
from db.models.post_model import Posts
from db.models.comment_model import Comments


comments = Blueprint('create_comment', __name__)


logger = logging.getLogger(__name__)


@comments.route('/', methods=['POST'])
@token_required
def create_comment_method():
    username = validate_token_by_user()
    user = database.query(db, Users, username=username)[0]
    post_id = request.json.get("id")
    post = database.query(db, Posts, id=post_id)[0]
    comment = request.json.get('comment')
    if not comment or len(comment) == 0:
        return response_msg('Please write a comment', 400)
    database.create(db, Comments, user=user,
                    post=post, comment=comment)
    return response_msg('Interaction Created')


@comments.route('/', methods=['GET'])
@token_required
def get_comment_method():
    post_id = int(request.args.get("id"))
    post = database.query(db, Posts, id=post_id)[0]
    comments = database.query(db, Comments, post=post)

    return [
        {'id': comment.id,
         'date': comment.created,
         'name': comment.user.username,
         'comment': comment.comment,
         'profilePicture': database.query(db, Profiles,
                                          user=comment.user)[0].picture
         } for comment in comments
    ]
