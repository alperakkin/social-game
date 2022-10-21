from db.models import db
from sqlalchemy.orm import backref
from db.models.base import BaseModel


class Comments(BaseModel, db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"),  nullable=False)
    user = db.relationship("Users")

    post_id = db.Column(db.Integer, db.ForeignKey(
        "posts.id"),  nullable=False)
    post = db.relationship("Posts", backref=backref(
        "comment_posts", cascade="all,delete"))

    comment = db.Column(db.Text)

    def __repr__(self):
        return '<Comments %r>' % self.id
