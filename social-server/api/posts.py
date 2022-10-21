
import logging

from flask import Blueprint, request

from utilities.sessions import (token_required, validate_token_by_user)
from utilities.responses import response_msg
from utilities import database

from db.models import db
from db.models.user_model import Users, Profiles
from db.models.post_model import Posts
from db.models.team_model import TeamMembers, Teams

list_posts = Blueprint('list_posts', __name__)
create_post = Blueprint('create_post', __name__)
delete_post = Blueprint('delete_post', __name__)

logger = logging.getLogger(__name__)


@list_posts.route('/', methods=['GET'])
@token_required
def list_posts_method():

    post_list = []

    username = validate_token_by_user()

    user = database.query(db, Users, username=username)[0]

    teams = database.query(db, TeamMembers, user=user)
    teams = list(set([member.team for member in teams]))
    for team in teams:
        posts = database.query(db, Posts, team=team)
        for post in posts:
            msg = {
                'id': post.id,
                'date': post.created,
                'name': post.user.username,
                'msg': post.msg,
                'img': post.image,
                'team': post.team.teamname,
                'profilePicture': database.query(db, Profiles,
                                                 user=post.user)[0].picture
            }
            post_list.append(msg)

    return response_msg(post_list)


@create_post.route('/', methods=['POST'])
@token_required
def create_post_method():

    username = validate_token_by_user()
    msg = request.json.get('msg')
    img = request.json.get('img')
    team_name = request.json.get('team_name')
    user = database.query(db, Users, username=username)[0]
    team = database.query(db, Teams, teamname=team_name)[0]
    database.create(db, Posts, user=user, team=team,
                    msg=msg, image=img)
    return response_msg('Post Created')


@delete_post.route('/', methods=['DELETE'])
@token_required
def delete_post_method():
    username = validate_token_by_user()
    user = database.query(db, Users, username=username)[0]
    post_id = int(request.args.get('id'))
    status = database.delete(db, Posts, user=user, id=post_id)
    if status:
        return response_msg('Post Deleted')
    return response_msg('You dont have permission to delete this post', 400)
