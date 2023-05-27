from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='Mann')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Robert')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Hill')
    josh = User(
        username='notdaton1', email='notdaton@aa.io', password='password', first_name='Josh', last_name='Clarkson'
    )
    matt = User(
        username='matt123', email='matt123@aa.io', password='password', first_name='Matt', last_name='Hertz'
    )
    biggs = User(
        username='bigounce', email='bigounce@aa.io', password='password', first_name='Biggerton', last_name='Ounce'
    )
    tavish = User(
        username='degroot1', email='demoman@aa.io', password='password', first_name='Tavish', last_name='Degroot'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(josh)
    db.session.add(matt)
    db.session.add(biggs)
    db.session.add(tavish)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()