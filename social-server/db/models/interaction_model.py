
from db.models import db
from sqlalchemy.orm import backref
from db.models.base import BaseModel


class Interactions(BaseModel, db.Model):

    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"),  nullable=False)
    user = db.relationship("Users")

    post_id = db.Column(db.Integer, db.ForeignKey(
        "posts.id"), nullable=False)
    post = db.relationship("Posts", backref=backref(
        "posts", cascade="all,delete"))

    like = db.Column(db.Integer, default=0)
    dislike = db.Column(db.Integer, default=0)

    def __repr__(self):
        return '<Interactions %r>' % self.id
