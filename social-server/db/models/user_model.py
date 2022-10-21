from db.models import db
from sqlalchemy.orm import backref
from db.models.base import BaseModel


class Users(BaseModel, db.Model):
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text, nullable=False)
    score = db.Column(db.Integer, default=0)

    def __repr__(self):
        return '<Users %r>' % self.username


class Profiles(BaseModel, db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("Users", backref=backref("users",
                                                    cascade="all,delete"))
    picture = db.Column(db.Text)

    def __repr__(self):
        return '<User Profiles %r>' % self.user.username
