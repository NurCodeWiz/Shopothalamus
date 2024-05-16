from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Cart, CartItem
from app.forms.cart_item_form import CartItemForm

cart_routes = Blueprint('carts', __name__)

# Helper functions
def is_authorized_cart(cart_id):
    """Check if the current user is authorized to access the cart."""
    cart = Cart.query.get(cart_id)
    if not cart or cart.user_id != current_user.id:
        return False, {'error': 'Unauthorized'}, 403
    return True, cart, None

def check_active_cart():
    """Check for an existing active cart for the current user."""
    active_cart = Cart.query.filter_by(user_id=current_user.id, isOrdered=False).first()
    return active_cart

# Before request handler to check login
@cart_routes.before_request
@login_required
def before_request():
    """Ensure that current_user exists before processing requests."""
    if not current_user:
        return jsonify({'error': 'Unauthorized'}), 403

@cart_routes.route('/',methods=['DELETE'])
@login_required
def empty_cart():
    carts = Cart.query.filter_by(user_id = current_user.id).all()
    cart_products = CartItem.query.filter_by(cart_id=carts[0].id).all()
    for product in cart_products:
        db.session.delete(product)
    db.session.commit()
    return {"message": "cart successfully emptied"}

# @cart_routes.route('/', methods=['DELETE'])
# @login_required
# def empty_cart():
#     try:
#         carts = Cart.query.filter_by(user_id=current_user.id).all()

#         if not carts:
#             return {"message": "No items in cart to delete"}, 200

#         for cart in carts:
#             for item in cart.cart_items:
#                 db.session.delete(item)
#             db.session.delete(cart)

#         db.session.commit()
#         return {"message": "Cart successfully emptied"}, 200
#     except Exception as e:
#         db.session.rollback()
#         return {"error": str(e)}, 500

# Routes
@cart_routes.route('/all')
def all_carts():
    user_carts = Cart.query.filter_by(user_id=current_user.id).all()
    return jsonify({'Carts': [cart.to_dict() for cart in user_carts]})

@cart_routes.route('/active')
def active_carts():
    active_cart = check_active_cart()
    if not active_cart:
        return jsonify({'message': 'Your shopping cart is empty. Start adding items!'})
    return jsonify({'ActiveCart': active_cart.to_dict()})

@cart_routes.route('/new', methods=['POST'])
def create_cart():
    if check_active_cart():
        return jsonify({'error': 'A cart is already active for this user. Creating a new one is not allowed'}), 400
    new_cart = Cart(user_id=current_user.id, isOrdered=False)
    db.session.add(new_cart)
    db.session.commit()
    return jsonify(new_cart.to_dict()), 201

@cart_routes.route('/<int:id>')
def active_cart_items(id):
    authorized, response_or_cart, error = is_authorized_cart(id)
    if not authorized:
        return jsonify(response_or_cart), error
    cart_items = CartItem.query.filter_by(cart_id=id).all()
    return jsonify({'CartItems': [item.to_dict() for item in cart_items]})

@cart_routes.route('/<int:id>/products/new', methods=['POST'])
def add_product_to_cart(id):
    authorized, response_or_cart, error = is_authorized_cart(id)
    if not authorized:
        return jsonify(response_or_cart), error
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_item = CartItem(
            cart_id=id,
            product_id=form.product_id.data,
            quantity=form.quantity.data
        )
        db.session.add(new_item)
        db.session.commit()
        return jsonify(new_item.to_dict()), 201
    return jsonify({'error': form.errors}), 400

@cart_routes.route('/active/<int:id>/edit', methods=['PUT'])
def update_cart_item(id):
    cart_item = CartItem.query.get(id)
    if not cart_item:
        return jsonify({'error': 'Cart Item not found'}), 404
    authorized, response_or_cart, error = is_authorized_cart(cart_item.cart_id)
    if not authorized:
        return jsonify(response_or_cart), error
    if response_or_cart.isOrdered:
        return jsonify({'error': 'Cannot edit past orders.'}), 400
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        cart_item.quantity = form.quantity.data
        db.session.commit()
        return jsonify({"message": "Cart Item quantity successfully updated."}), 200
    return jsonify({'error': form.errors}), 400

@cart_routes.route('/active/<int:id>/delete', methods=['DELETE'])
def delete_cart_item(id):
    cart_item = CartItem.query.get(id)
    if not cart_item:
        return jsonify({'error': 'Cart Item not found'}), 404
    authorized, response_or_cart, error = is_authorized_cart(cart_item.cart_id)
    if not authorized:
        return jsonify(response_or_cart), error
    if response_or_cart.isOrdered:
        return jsonify({'error': 'Past orders cannot be deleted.'}), 400
    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": 'Cart item successfully deleted.'}), 200
