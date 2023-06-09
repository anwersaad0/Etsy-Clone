from .db import db, environment, SCHEMA, add_prefix_for_prod
from .cart import carts
#from models import User

from sqlalchemy.schema import ForeignKey

class Item(db.Model):
    __tablename__ = "items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(800), nullable=False)
    rating = db.Column(db.Float)
    image = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))

    user = db.relationship('User', back_populates='items')
    reviews = db.relationship('Review', back_populates='item', cascade="all, delete-orphan")
    user_cart = db.relationship('User', secondary=carts, back_populates='item_cart')

    def avg_rating(self):
        sum = 0

        if self.reviews:
            for rev in self.reviews:
                sum += rev.rating
        
            avg = sum / len(self.reviews)
            return avg
        

    def to_dict(self): 
        data = {
        'id': self.id,
        'name': self.name,
        'price': self.price,
        'description': self.description,
        'rating': self.avg_rating(),
        'image': self.image,

        'userId': self.user_id
        }

        return data

