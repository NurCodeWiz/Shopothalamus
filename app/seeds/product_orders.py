from app.models import db, ProductOrder,environment,SCHEMA
from sqlalchemy.sql import text

def seed_product_orders():


        product_order1=ProductOrder(product_id=1, order_id=1, quantity=2)
        product_order2=ProductOrder(product_id=2, order_id=1, quantity=1)
        product_order3=ProductOrder(product_id=3, order_id=2, quantity=1)
        product_order4=ProductOrder(product_id=4, order_id=2, quantity=2)
        product_order5=ProductOrder(product_id=5, order_id=2, quantity=3)
        product_order6=ProductOrder(product_id=1, order_id=3, quantity=2)
        product_order7=ProductOrder(product_id=2, order_id=3, quantity=1)
        product_order8=ProductOrder(product_id=3, order_id=3, quantity=1)
        product_order9=ProductOrder(product_id=4, order_id=3, quantity=1)
        product_order10=ProductOrder(product_id=5, order_id=2, quantity=1)


        all_product_orders = [product_order1, product_order2, product_order3,product_order4,product_order5,product_order6,product_order7,product_order8,product_order9,product_order10]


        for po in all_product_orders:
            db.session.add(po)
            db.session.commit()

def undo_product_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_orders"))
    db.session.commit()
