from .db import db, environment, SCHEMA
from models import User

class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.column(db.Float, nullable=False)
    #user_id = db.Column(db.Integer, )
