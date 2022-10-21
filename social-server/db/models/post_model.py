from db.models import db
from db.models.base import BaseModel


class Posts(BaseModel, db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"),  nullable=False)
    user = db.relationship("Users")
    team_id = db.Column(db.Integer, db.ForeignKey(
        "teams.id"),  nullable=False)
    team = db.relationship("Teams")
    msg = db.Column(db.String(100), nullable=False)
    image = db.Column(db.Text)

    def __repr__(self):
        return '<Posts %r>' % self.id
