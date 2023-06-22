from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

class ItemCart(db.Model):
    __tablename__ = "item_cart"
    