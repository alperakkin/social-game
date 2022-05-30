from db.models import db


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return '<Users %r>' % self.username
