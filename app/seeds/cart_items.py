from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cart_items():
    u1i1 = CartItem(cart_id=1, product_id=3, quantity=3)
    u1i2 = CartItem(cart_id=1, product_id=2, quantity=1)
    u1i3 = CartItem(cart_id=1, product_id=13, quantity=2)
    u1i4 = CartItem(cart_id=1, product_id=19, quantity=1)

    u2i1 = CartItem(cart_id=2, product_id=4, quantity=1)
    u2i2 = CartItem(cart_id=2, product_id=16, quantity=2)

    u3i1 = CartItem(cart_id=3, product_id=3, quantity=3)
    u3i2 = CartItem(cart_id=3, product_id=2, quantity=1)
    u3i3 = CartItem(cart_id=3, product_id=13, quantity=2)
    u3i4 = CartItem(cart_id=3, product_id=19, quantity=1)

    u3i5 = CartItem(cart_id=4, product_id=4, quantity=1)
    u3i6 = CartItem(cart_id=4, product_id=16, quantity=2)

    db.session.add_all([u1i1, u1i2, u1i3, u1i4, u2i1, u2i2, u3i1, u3i2, u3i3, u3i4, u3i5, u3i6])
    db.session.commit()

def undo_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))
    db.session.commit()
