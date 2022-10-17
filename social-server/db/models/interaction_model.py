from datetime import datetime
from db.models import db


class Interactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime(), default=datetime.utcnow(),
                        nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("Users")

    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    post = db.relationship("Posts")

    like = db.Column(db.Integer, default=0)
    dislike = db.Column(db.Integer, default=0)

    def __repr__(self):
        return '<Interactions %r>' % self.id
