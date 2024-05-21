# from datetime import datetime, timedelta
# import threading
# import time
# from app.models import db, Order

# def update_order_status():
#     while True:
#         # Calculate the time 5 minutes ago
#         five_minutes_ago = datetime.utcnow() - timedelta(minutes=5)
#         # Fetch orders that are pending and created more than 5 minutes ago
#         orders = Order.query.filter(Order.status == 'Pending', Order.createdAt <= five_minutes_ago).all()

#         for order in orders:
#             order.status = 'Delivered'
#             db.session.add(order)

#         db.session.commit()

#         # Sleep for 60 seconds before checking again
#         time.sleep(60)

# def start_background_task():
#     thread = threading.Thread(target=update_order_status)
#     thread.daemon = True
#     thread.start()
from datetime import datetime, timedelta
import threading
import time
from app.models import db, Order
import logging

logging.basicConfig(level=logging.INFO)

def update_order_status():
    while True:
        logging.info("Checking for pending orders to update...")
        # Calculate the time 5 minutes ago
        five_minutes_ago = datetime.utcnow() - timedelta(minutes=5)
        # Fetch orders that are pending and created more than 5 minutes ago
        orders = Order.query.filter(Order.status == 'Pending', Order.createdAt <= five_minutes_ago).all()

        for order in orders:
            logging.info(f"Updating order ID {order.id} to 'Delivered'")
            order.status = 'Delivered'
            db.session.add(order)

        if orders:
            db.session.commit()
            logging.info("Order statuses updated.")
        else:
            logging.info("No orders to update.")

        # Sleep for 60 seconds before checking again
        time.sleep(60)

def start_background_task():
    thread = threading.Thread(target=update_order_status)
    thread.daemon = True
    thread.start()
