from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text

def seed_items():
    item_1 = Item(
        name="Persistent Petitioners", 
        price=3.94, 
        description="1/3 Blue Creature Card. Great for mill focused blue decks, especially when having multiple of this card", 
        image='https://decks-hobbies-images.s3.us-west-1.amazonaws.com/da9af6c4f36c4b109153f8ba63a75909.jpg', 
        user_id=1
        )
    
    item_2 = Item(
        name="Grand Abolisher", 
        price=27.55, 
        description="2/2 White Creature Card. Prevents opponents from using spells as long as it's your turn.", 
        image='https://decks-hobbies-images.s3.us-west-1.amazonaws.com/f1143ccb059b4029a86f3ea804728a36.jpg', 
        user_id=2
        )
    
    item_3 = Item(
        name="Reliquary Tower", 
        price=2.41, 
        description="Utility Land card, removes limit on maximum hand size. Great for any deck.", 
        image='https://decks-hobbies-images.s3.us-west-1.amazonaws.com/44313a7c8d1a4e43b4b62533439b67ad.jpg', 
        user_id=3
        )
    
    item_4 = Item(
        name="Mana Crypt",
        price=187.37,
        description="Strong Mana Artifact. Adds 2 colorless mana to your pool at the cost of potentially losing life.",
        image="https://decks-hobbies-images.s3.us-west-1.amazonaws.com/397ebdb5bb8f4182ab87fbcd7ba66ee3.jpg",
        user_id=2
    )

    item_5 = Item(
        name="Bruvac, the Grandiloquent",
        price=33.32,
        description="Blue 1/4 Commander Card. Doubles all milling effects against opponents.",
        image="https://decks-hobbies-images.s3.us-west-1.amazonaws.com/0db52308f20b466e86a7ae9974d0ce07.jpg",
        user_id=1
    )

    item_6 = Item(
        name="Old One Eye",
        price=1.92,
        description="6/6 Legendary Creature card. Originally from the Tyranid Swarm Commander Deck.",
        image="https://decks-hobbies-images.s3.us-west-1.amazonaws.com/13446aa3a84e41378a6a616da3fed79c.jpg",
        user_id=3
    )

    item_7 = Item(
        name="Godo, Bandit Warlord",
        price=5.99,
        description="3/3 Red Commander card, great for super offensive red decks for his ability to give two attack phases.",
        image="https://decks-hobbies-images.s3.us-west-1.amazonaws.com/ba5b6971466743569d8c9a9b9e7324a3.jpg",
        user_id=4
    )

    item_8 = Item(
        name="Sol Ring",
        price=1.40,
        description="1 cost Mana Artifact, can be used in every kind of deck for its effect.",
        image="https://decks-hobbies-images.s3.us-west-1.amazonaws.com/53c2c64be53e41adbed01b787b9d5821.jpg",
        user_id=4
    )

    item_9 = Item(
        name="Decree of Annihilation",
        price=1.13,
        description="Red sorcery, used as a board wipe to take out everything in the field.",
        image="https://decks-hobbies-images.s3.us-west-1.amazonaws.com/5d7b353453a447a5a6f0ef7d11fa089c.jpg",
        user_id=4
    )

    item_10 = Item(
        name="AEtherize",
        price=0.33,
        description="Blue Instant card, main use is to counter opponent combat phases and prevent taking damage.",
        image="https://decks-hobbies-images.s3.us-west-1.amazonaws.com/c434a98d82f04eb781bae64814d15254.jpg",
        user_id=5
    )
    


    db.session.add(item_1)
    db.session.add(item_2)
    db.session.add(item_3)
    db.session.add(item_4)
    db.session.add(item_5)
    db.session.add(item_6)
    db.session.add(item_7)
    db.session.add(item_8)
    db.session.add(item_9)
    db.session.add(item_10)
    db.session.commit()


def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))
        
    db.session.commit()