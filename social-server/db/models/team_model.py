from datetime import datetime
from db.models import db


class Teams(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    teamname = db.Column(db.String(80), nullable=False)
    teamscore = db.Column(db.String(80), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    creator = db.relationship("Users")
    created = db.Column(db.DateTime())

    def __repr__(self):
        return '<Teams %r>' % self.teamname


class TeamMembers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"))
    team = db.relationship("Teams")
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("Users")
    entry_date = db.Column(db.DateTime(), default=datetime.utcnow)
    is_approved = db.Column(db.Boolean)




