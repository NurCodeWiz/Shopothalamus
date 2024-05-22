from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, Order, ProductOrder, Cart, Product, ProductImage

orders = Blueprint('orders', __name__)

@orders.get('/')
@login_required
def get_user_orders():
    orders = Order.query.filter_by(user_id=current_user.id).all()
    normal_orders = {
        'byId': {},
        'allIds': []
    }

    # print('xxxxxxxxx', orders)

    for order in orders:
        order_dict = order.to_dict()
        order_products = ProductOrder.query.filter_by(order_id=order.id).all()
        products_list = []

        for product_order in order_products:
            product = Product.query.get(product_order.product_id)
            product_image = ProductImage.query.filter_by(product_id=product.id).first()  # Fetch the first image

            product_info = {
                'productId': product.id,
                'quantity': product_order.quantity,
                'name': product.name,
                'image': {'id': product_image.id, 'url': product_image.url} if product_image else None
            }
            products_list.append(product_info)

        order_dict['products'] = products_list
        normal_orders['byId'][order.id] = order_dict
        normal_orders['allIds'].append(order.id)

    return jsonify(normal_orders)

@orders.post('/')
@login_required
def create_user_order():
    data = request.json
    cart_id = data.get('cartId')
    if not cart_id:
        return jsonify({'error': 'cartId is required'}), 400

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

    db.session.query(ProductOrder).filter(ProductOrder.order_id == order.id).delete()
    deleted = order.to_dict()
    db.session.delete(order)
    db.session.commit()

    return {deleted['id']: deleted}
