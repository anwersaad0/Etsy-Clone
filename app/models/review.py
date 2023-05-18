from .db import db, environment, SCHEMA, add_prefix_for_prod
#from models import User

from sqlalchemy.schema import ForeignKey

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    item_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('items.id')))
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))

    item = db.relationship("Item", back_populates='reviews')
    user = db.relationship("User", back_populates='reviews')

    def to_dict(self):
        data = {
            'id': self.id,
            'review': self.review,
            'rating': self.rating,

            'itemId': self.item_id,
            'userId': self.user_id
        }

        return data