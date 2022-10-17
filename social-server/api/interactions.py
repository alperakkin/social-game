
import logging
import operator

from flask import Blueprint, request

from utilities.sessions import (token_required, validate_token_by_user)
from utilities.responses import response_msg
from utilities import database

from db.models import db
from db.models.user_model import Users
from db.models.post_model import Posts
from db.models.interaction_model import Interactions


interactions = Blueprint('create_interaction', __name__)



logger = logging.getLogger(__name__)


@interactions.route('/', methods=['POST'])
@token_required
def create_interactions_method():
    like = 0
    dislike = 0
    username = validate_token_by_user()
    user = database.query(db, Users, username=username)[0]
    post_id = request.json.get("id")
    opr = request.json.get("operation")
    state = request.json.get("state")
    post = database.query(db, Posts, id=post_id)[0]

    if state == 'like':
        like = getattr(operator, opr)(like, 1)
    if state == 'dislike':
        dislike = getattr(operator, opr)(dislike, 1)

    database.create(db, Interactions, user=user,
                    post=post, like=like, dislike=dislike)
    return response_msg('Interaction Created')


@interactions.route('/', methods=['GET'])
@token_required
def get_interactions_method():
    username = validate_token_by_user()
    post_id = int(request.args.get("id"))
    post = database.query(db, Posts, id=post_id)[0]
    interaction = database.query(db, Interactions, post=post)

    return {'like': sum([item.like for item in interaction]),
            'dislike': sum(item.dislike for item in interaction),
            'userLike': sum([item.like for item in interaction if item.user.username == username]),
            'userDislike': sum([item.dislike for item in interaction if item.user.username == username])
            }
