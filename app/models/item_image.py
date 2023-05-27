from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

class ItemImage(db.Model):
    __tablename__ = "itemimages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)

    #item_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('items.id')))

    #item = db.relationship("Item", back_populates="image")

    def to_dict(self):
        data = {
            'id': self.id,
            'url': self.url,
            'itemId': self.item_id
        }

        return data