from app.models import db, Order, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_orders():

    order1 = Order(
        user_id=1,
        cart_id=1,
        status="Pending",
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )

    order2 = Order(
        user_id=2,
        cart_id=1,
        status="Shipped",
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )

    order3 = Order(
        user_id=1,
        cart_id=3,
        status="Delivered",
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )


    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)


    db.session.commit()

def undo_orders():

    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))
    db.session.commit()
