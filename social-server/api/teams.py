from flask import Blueprint, request

from utilities.sessions import (token_required, validate_token_by_user)
from utilities.responses import response_msg
from utilities import database
from db.models import db
from db.models.user_model import Users, Profiles
from db.models.team_model import (Teams, TeamMembers)

from datetime import datetime

create_team = Blueprint('create_team', __name__)
team_request = Blueprint('team_request', __name__)
team_approve = Blueprint('team_approve', __name__)
team_list = Blueprint('team_list', __name__)
all_teams = Blueprint('all_teams', __name__)
team_delete = Blueprint('team_delete', __name__)
remove_member = Blueprint('remove_member', __name__)


@create_team.route('/', methods=['POST'])
@token_required
def create_method():
    username = validate_token_by_user()
    teamname = request.json.get("team_name")
    created = datetime.utcnow()
    if not teamname:
        return response_msg("Please enter a valid team name", 400)

    user = database.query(db, Users, username=username)[0]
    team_exists = database.query(db, Teams, teamname=teamname)
    if team_exists:
        return response_msg('Duplicate Team Name', 400)

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
        return response_msg("Please enter a valid team name", 400)

    user = database.query(db, Users, username=username)[0]
    team = database.query(db, Teams, teamname=teamname)[0]
    if user.username == team.creator.username:
        return response_msg("You can not make request to your own team", 400)
    team_member = database.query(db, TeamMembers, team=team, user=user)
    if team_member:
        return response_msg("You have already made"
        f"a request to join the team <{teamname}>", 400)  # noqa
    database.create(db, TeamMembers, team=team, user=user, is_approved=False)

    return response_msg('Team Request Made')


@team_approve.route('/', methods=['POST'])
@token_required
def team_approve_method():
    owned_user = validate_token_by_user()
    teamname = request.json.get("team_name")
    username = request.json.get("username")
    approval = request.json.get("approval", False)

    if not teamname:
        return response_msg("Please enter a valid team name", 400)

    user = database.query(db, Users, username=owned_user)[0]
    requested_user = database.query(db, Users, username=username)[0]
    owned_team = database.query(db, Teams, teamname=teamname, creator=user)
    if not owned_team:
        return response_msg('User does not have an owned team', 400)

    owned_team = owned_team[0]

    team_member = database.query(db, TeamMembers, team=owned_team,
                                 user=requested_user)[0]
    if not approval:
        database.delete(db, TeamMembers, team=owned_team,
                        user=team_member.user)
        return response_msg("User rejected by Owner")
    database.update(db, [team_member], is_approved=True,
                    entry_date=datetime.utcnow())
    return response_msg('User Approved')


@team_delete.route('/', methods=['DELETE'])
@token_required
def team_delete_method():
    username = validate_token_by_user()
    team_name = request.args.get('teamname')
    user = database.query(db, Users, username=username)[0]
    team = database.query(db, Teams, teamname=team_name, creator=user)
    if not team:
        return response_msg(f'You dont have permisson to delete > {team_name}',
                            400)

    database.delete_object(db, team[0])
    return response_msg(f'{team_name} deleted')


@team_list.route('/', methods=['GET'])
@token_required
def team_list_method():
    username = validate_token_by_user()
    user = database.query(db, Users, username=username)[0]
    teams = database.query(db, TeamMembers, user=user, is_approved=True)

    team_data = []
    for item in teams:
        team_members = database.query(db, TeamMembers,
                                      team=item.team)
        team_data.append(
            {'team': item.team.teamname,
             'score': item.team.teamscore,
             'team_members': [
                 {'memberScore': team_member.user.score,
                  'memberName': team_member.user.username,
                  'memberJoined': team_member.entry_date,
                  "isApproved": team_member.is_approved,
                  "profilePicture": database.query(db,
                                                   Profiles,
                                                   user=team_member.user
                                                   )[0].picture
                  } for team_member in team_members]

             })

    return response_msg(team_data)


@all_teams.route('/', methods=['GET'])
@token_required
def team_list_all_method():
    teams = database.query(db, Teams)

    team_data = []
    for item in teams:
        team_members = database.query(db, TeamMembers, team=item)
        team_data.append(
            {'team': item.teamname,
             'score': item.teamscore,
             'team_members': [
                 {'member': team_member.user.username,
                  'is_approved': team_member.is_approved} for
                 team_member in team_members],
             'creator': item.creator.username,
             "profilePicture": database.query(db, Profiles,
                                              user=item.creator)[0].picture,
             'creator_score': item.creator.score
             })
        team_data = sorted(
            team_data, key=lambda item: item['score'], reverse=True
        )

    return response_msg(team_data)


@remove_member.route('/', methods=['DELETE'])
@token_required
def remove_member_method():
    username = validate_token_by_user()
    team_name = request.args.get('teamname')
    member_name = request.args.get('member')
    user = database.query(db, Users, username=username)[0]
    owned_team = database.query(db, Teams, teamname=team_name, creator=user)
    if username == member_name and owned_team:
        return response_msg('Team creator can not remove themselves from '
                            'team. You can delete the team instead', 400)
    if not owned_team and member_name != username:
        return response_msg('You dont have permisson to remove user '
                            f'{member_name} from  > {team_name}', 400)

    member = database.query(db, Users, username=member_name)[0]
    team_member = database.query(db, TeamMembers, user=member)[0]

    database.delete_object(db, team_member)
    return response_msg(f'{member_name} removed from {team_name} team ')
