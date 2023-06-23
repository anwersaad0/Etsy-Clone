from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

carts = db.Table(
    'item_cart',
    db.Model.metadata,
    db.Column('user_id', db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('item_id', db.ForeignKey(add_prefix_for_prod('items.id')), primary_key=True)
)

if environment == "production":
    carts.schema = SCHEMA