from api.posts import list_posts, create_post, delete_post
from api.users import login, logout, register, delete
from api.teams import create_team, team_request, team_approve, team_list
from api.interactions import interactions
from api.comments import comments
from api.index import home


def add_routes(app):
    # index
    app.register_blueprint(home, url_prefix='/api', name='home')

    # users
    app.register_blueprint(login, url_prefix='/api/login', name='user_login')
    app.register_blueprint(logout, url_prefix='/api/logout', name='user_logout')
    app.register_blueprint(register, url_prefix='/api/register', name='register')
    app.register_blueprint(delete, url_prefix='/api/delete', name='user_delete')

    # teams
    app.register_blueprint(create_team, url_prefix='/api/teams/create', name='create_team')
    app.register_blueprint(team_request, url_prefix='/api/teams/request', name='team_request')
    app.register_blueprint(team_approve, url_prefix='/api/teams/approve', name='team_approve')
    app.register_blueprint(team_list, url_prefix='/api/teams', name='team_list')

    # posts
    app.register_blueprint(list_posts, url_prefix='/api/posts', name='list_posts')
    app.register_blueprint(create_post, url_prefix='/api/posts/create', name='create_post')
    app.register_blueprint(delete_post, url_prefix='/api/posts/delete', name='delete_post')

    # interactions
    app.register_blueprint(interactions,
                           url_prefix='/api/interactions', name='list_interactions')
    app.register_blueprint(interactions,
                           url_prefix='/api/interactions/create', name='create_interctions')
    
    # comments
    app.register_blueprint(comments,
                           url_prefix='/api/comments', name='list_comments')
    app.register_blueprint(comments,
                           url_prefix='/api/comments/create', name='create_comments')

