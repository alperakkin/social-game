from datetime import datetime

def create(db, model, **columns):
    columns["created"] = datetime.utcnow()
    new = model(**columns)
    db.session.add(new)
    db.session.commit()
    return new


def update(db, objects, **columns):

    for k, v in columns.items():
        for obj in objects:
            setattr(obj, k, v)
    db.session.commit()
    return obj


def delete(db, model, **columns):
    res = model.query.filter_by(**columns).all()
    if not res:
        return False
    for obj in res:
        db.session.delete(obj)
    db.session.commit()
    return True


def query(db, model, **columns):
    return model.query.filter_by(**columns).all()
