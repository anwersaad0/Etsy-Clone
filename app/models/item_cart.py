from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

class ItemCart(db.Model):
    __tablename__ = "item_cart"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)

    item_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('items.id')))
    cart_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('carts.id')))