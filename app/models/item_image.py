from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

class ItemImage(db.Model):
    __tablename__ = "itemimages"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)

    item_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('items.id')))

    item = db.relationship("Item", back_populates="images")

    def to_dict(self):
        data = {
            'id': self.id,
            'url': self.url,
            'itemId': self.item_id
        }

        return data