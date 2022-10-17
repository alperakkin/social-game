from flask import Blueprint, request

from utilities.sessions import (token_required, validate_token_by_user)
from utilities.responses import response_msg
from utilities import database
from db.models import db
from db.models.user_model import Users
from db.models.team_model import (Teams, TeamMembers)

from datetime import datetime

create_team = Blueprint('create_team', __name__)
team_request = Blueprint('team_request', __name__)
team_approve = Blueprint('team_approve', __name__)
team_list = Blueprint('team_list', __name__)


@create_team.route('/', methods=['POST'])
@token_required
def create_method():
    username = validate_token_by_user()
    teamname = request.json.get("team_name")
    created = datetime.utcnow()
    if not teamname:
        return response_msg("Please enter a valid team name", 403)

    user = database.query(db, Users, username=username)[0]

    team = database.create(db, Teams, teamname=teamname, teamscore=0,
                           creator=user, created=created)

    database.create(db, TeamMembers, team=team, user=user, is_approved=True)

    return response_msg('Team Created')


@team_request.route('/', methods=['POST'])
@token_required
def team_request_method():
    username = validate_token_by_user()
    teamname = request.json.get("team_name")

    if not teamname:
        return response_msg("Please enter a valid team name", 403)

    user = database.query(db, Users, username=username)[0]
    team = database.query(db, Teams, teamname=teamname)[0]
    database.create(db, TeamMembers, team=team, user=user, is_approved=False)

    return response_msg('Team Request Made')


@team_approve.route('/', methods=['POST'])
@token_required
def team_approve_method():
    owned_user = validate_token_by_user()
    teamname = request.json.get("team_name")
    username = request.json.get("username")

    if not teamname:
        return response_msg("Please enter a valid team name", 403)

    user = database.query(db, Users, username=owned_user)[0]
    requested_user = database.query(db, Users, username=username)[0]
    owned_team = database.query(db, Teams, teamname=teamname, creator=user)
    if not owned_team:
        return response_msg('User does not have a owned team', 403)
    owned_team = owned_team[0]

    team_member = database.query(db, TeamMembers, team=owned_team,
                                 user=requested_user)
    database.update(db, team_member, is_approved=True)
    return response_msg('User Approved')


@team_list.route('/', methods=['GET'])
@token_required
def team_list_method():
    username = validate_token_by_user()
    user = database.query(db, Users, username=username)[0]
    teams = database.query(db, TeamMembers, user=user, is_approved=True)

    team_data = []
    for item in teams:
        team_members = database.query(db, TeamMembers,
                                      team=item.team, is_approved=True)
        team_data.append(
            {'team': item.team.teamname,
             'score': item.team.teamscore,
             'team_members': [
                 team_member.user.username for
                 team_member in team_members]
             })

    return response_msg(team_data)
