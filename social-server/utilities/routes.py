from api.users import login, logout, register, delete
from api.teams import create_team, team_request, team_approve, team_list
from api.index import home


def add_routes(app):
    # index
    app.register_blueprint(home, url_prefix='/api')

    # users
    app.register_blueprint(login, url_prefix='/api/login')
    app.register_blueprint(logout, url_prefix='/api/logout')
    app.register_blueprint(register, url_prefix='/api/register')
    app.register_blueprint(delete, url_prefix='/api/delete')

    # teams
    app.register_blueprint(create_team, url_prefix='/api/teams/create')
    app.register_blueprint(team_request, url_prefix='/api/teams/request')
    app.register_blueprint(team_approve, url_prefix='/api/teams/approve')
    app.register_blueprint(team_list, url_prefix='/api/teams/')
