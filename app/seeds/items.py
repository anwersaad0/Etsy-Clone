from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text

def seed_items():
    item_1 = Item(name="Blank Card", price="2.55", description="A Blank Card", image='url.com', user_id=1)
    item_2 = Item(name="Blank Card #2", price="2.55", description="A Blank Card too", image='url.com', user_id=2)
    item_3 = Item(name="Blank Card #3", price="2.33", description="A Blank Card 3", image='url.com', user_id=3)

    db.session.add(item_1)
    db.session.add(item_2)
    db.session.add(item_3)
    db.session.commit()


def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))
        
    db.session.commit()