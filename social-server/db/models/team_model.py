from db.models import db

from sqlalchemy.orm import backref
from db.models.base import BaseModel


class Teams(BaseModel, db.Model):
    teamname = db.Column(db.String(80), nullable=False)
    teamscore = db.Column(db.String(80), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"))
    creator = db.relationship("Users")

    def __repr__(self):
        return '<Teams %r>' % self.teamname


class TeamMembers(BaseModel, db.Model):
    team_id = db.Column(db.Integer, db.ForeignKey(
        "teams.id"))
    team = db.relationship("Teams", backref=backref("teams",
                                                    cascade="all,delete"))
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"))
    user = db.relationship("Users")
    entry_date = db.Column(db.DateTime())
    is_approved = db.Column(db.Boolean)

    def __repr__(self):
        return '<Team Members %r>' % self.teamname
