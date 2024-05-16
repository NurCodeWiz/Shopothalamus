from flask import Blueprint, request, redirect,jsonify
from flask_login import current_user, login_required
from app.models import db, Order, ProductOrder, Cart, Product

orders = Blueprint('orders', __name__)

# @orders.get('/')
# @login_required
# def get_user_orders():
#     orders = Order.query.filter_by(user_id = current_user.id).all()
#     normal_orders = {}
#     normal_orders['byId'] = {order.id: [product.product_id for product in ProductOrder.query.filter_by(order_id = order.id).all()] for order in orders}
#     normal_orders['allIds'] = [order.id for order in orders]
#     return normal_orders
@orders.get('/')
@login_required
def get_user_orders():
    orders = Order.query.filter_by(user_id=current_user.id).all()
    normal_orders = {}
    normal_orders['byId'] = {
        order.id: {
            **order.to_dict(),
            'products': [
                {
                    'productId': product.product_id,
                    'quantity': product.quantity,
                    'name': Product.query.get(product.product_id).name  # Fetch the product name
                }
                for product in ProductOrder.query.filter_by(order_id=order.id).all()
            ]
        }
        for order in orders
    }
    normal_orders['allIds'] = [order.id for order in orders]
    return jsonify(normal_orders)

# @orders.post('/')
# @login_required
# def create_user_order():
#     data = request.json

#     order = Order(
#         user_id = current_user.id,

#         status = "Pending"
#     )

#     for product in data['productOrders']:
#         product_order = ProductOrder(
#             product_id = product['productId'],
#             order_id = order.id,
#             quantity = product['quantity']
#         )
#         order.product_orders.append(product_order)

#     db.session.add(order)
#     db.session.commit()
#     db.session.refresh(order)

#     return {"allIds": [order.id], "byId": { order.id: order.to_dict() }}
@orders.post('/')
@login_required
def create_user_order():
    data = request.json

    # Ensure that cart_id is provided in the request data
    cart_id = data.get('cartId')
    if not cart_id:
        return jsonify({'error': 'cartId is required'}), 400

    # Check if the cart exists and belongs to the current user
    cart = Cart.query.filter_by(id=cart_id, user_id=current_user.id).first()
    if not cart:
        return jsonify({'error': 'Invalid cartId or unauthorized access'}), 403

    order = Order(
        user_id=current_user.id,
        cart_id=cart_id,
        status="Pending"
    )

    for product in data['productOrders']:
        product_order = ProductOrder(
            product_id=product['productId'],
            order_id=order.id,
            quantity=product['quantity']
        )
        order.product_orders.append(product_order)

    db.session.add(order)
    db.session.commit()
    db.session.refresh(order)

    return jsonify({"allIds": [order.id], "byId": {order.id: order.to_dict()}})

@orders.delete('/<int:id>')
@login_required
def cancel_user_order(id):
    order = db.session.get(Order, int(id))

    if order.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    deleted = order.to_dict()
    db.session.delete(order)
    db.session.commit()

    return {deleted['id']: deleted}
