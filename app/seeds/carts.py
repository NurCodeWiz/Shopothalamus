from app.models import db, Cart,environment,SCHEMA
from sqlalchemy.sql import text

def seed_carts():

    u1c1 = Cart(
        user_id=1,
        isOrdered=False
    )

    u2c1 = Cart(
        user_id=2,
        isOrdered=True
    )

    u3c1 = Cart(
        user_id=3,
        isOrdered=True
    )

    u3c2 = Cart(
        user_id=3,
        isOrdered=False
    )


    db.session.add(u1c1)
    db.session.add(u2c1)
    db.session.add(u3c1)
    db.session.add(u3c2)


    db.session.commit()

def undo_carts():

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))
    db.session.commit()
