from datetime import datetime
from db.models import db


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime(), default=datetime.utcnow(),
                        nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("Users")

    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    post = db.relationship("Posts")

    comment = db.Column(db.Text)

    def __repr__(self):
        return '<Comments %r>' % self.id
