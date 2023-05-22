from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review_1 = Review(review="Pretty good for a token set", rating=4, item_id=3, user_id=1)
    review_2 = Review(review="Wasn't someone selling a better version of this?", rating=2, item_id=2, user_id=3)
    review_3 = Review(review="Good for sac decks I guess", rating=3, item_id=1, user_id=2)

    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()