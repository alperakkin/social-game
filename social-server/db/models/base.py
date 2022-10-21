from datetime import datetime
from db.models import db


class BaseModel:
    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime(), default=datetime.utcnow(),
                        nullable=False)
