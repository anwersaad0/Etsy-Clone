from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review_1 = Review(review="Love that I can still have multiple of these even in Commander, very useful milling card", rating=5, item_id=1, user_id=3)
    review_2 = Review(review="This and Drannith Magistrate are a great combo, easy protection in most of my games", rating=5, item_id=2, user_id=1)
    review_3 = Review(review="When does any deck ever go wrong with having this?", rating=4, item_id=3, user_id=2)
    review_4 = Review(review="Putting a lower rating because of how ludicrous the price is. Otherwise, it's just as great as Sol Ring", rating=3, item_id=4, user_id=7)
    review_5 = Review(review="I see no reality where a mill deck doesn't have this guy as a commander.", rating=5, item_id=5, user_id=3)
    review_6 = Review(review="Great creature, but I doubt you can make him a viable commander", rating=2, item_id=6, user_id=4)
    review_7 = Review(review="Definitely pair this with Helm of the Host if you want some of the easiest wins a red deck can get you.", rating=5, item_id=7, user_id=5)
    review_8 = Review(review="Okay, why would you ever NOT have this card in any of your decks. Very necessary artifact.", rating=5, item_id=8, user_id=6)
    review_9 = Review(review="Just know that using this card affects you as much as it does other players in a match", rating=3, item_id=9, user_id=5)
    review_10 = Review(review="Very good instant since I usually don't want to risk losing my mill creatures instead", rating=4, item_id=10, user_id=3)
    review_11 = Review(review="I both love and hate this card, all fun and games until I'm on the recieving end of large mill effects", rating=4, item_id=5, user_id=7)
    review_12 = Review(review="This is one of the first cards you need to get when building any new deck, just saying", rating=5, item_id=8, user_id=7)

    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.add(review_4)
    db.session.add(review_5)
    db.session.add(review_6)
    db.session.add(review_7)
    db.session.add(review_8)
    db.session.add(review_9)
    db.session.add(review_10)
    db.session.add(review_11)
    db.session.add(review_12)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()