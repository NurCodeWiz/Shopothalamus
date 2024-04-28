from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Cart, CartItem
from app.forms.cart_item_form import CartItemForm


cart_routes = Blueprint('carts', __name__)

# GET ALL CARTS OF CURRENT USER
@cart_routes.route('/all')
@login_required
def all_carts():
    if not current_user:
        return jsonify({'error': 'Unauthorized'}), 403
    user_carts = Cart.query.filter(Cart.user_id == current_user.id).all()
    user_carts_lst = [cart.to_dict() for cart in user_carts]
    return {'Carts': user_carts_lst}

# GET ACTIVE CART (if cart.isOrder == False)
@cart_routes.route('/active')
@login_required
def active_carts():
    if not current_user:
        return jsonify({'error': 'Unauthorized'}), 403
    active_cart = Cart.query.filter(Cart.isOrdered == False).first()
    if not active_cart:
        return jsonify({'message': 'No active cart, create a new cart.'})
    if active_cart.user_id != current_user.id:
        return jsonify({'message':'Unauthorized'}), 403

    return {"ActiveCart": active_cart.to_dict()}


@cart_routes.route('/new', methods=['POST'])
@login_required
def create_cart():
    print(f"Current user: {current_user.id}")
    active_cart = Cart.query.filter_by(user_id=current_user.id, isOrdered=False).first()
    print('====>',request.form)
    print('=====>',request.files)
    if active_cart:
        return jsonify({'error': 'User already has an active cart. Cannot create a new cart.'}), 400

    new_cart = Cart(user_id=current_user.id, isOrdered=False)
    db.session.add(new_cart)
    try:
        db.session.commit()
        return jsonify(new_cart.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error creating cart: {e}")
        return jsonify({'error': str(e)}), 500

# GET ALL CARTITEMS BY CART.ID
@cart_routes.route('/<int:id>')
@login_required
def active_cart_items(id):
    # If current user doesnt exisit, throw 403
    if not current_user:
        return jsonify({'error': 'Unauthorized'}), 403

    curr_cart = Cart.query.get(id)
    #not belong to current user throw 403
    if current_user.id != curr_cart.user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    # Get cart items that match the cart.id
    cart_items = CartItem.query.filter(CartItem.cart_id == id).all()
    cart_items_lst = [items.to_dict() for items in cart_items]
    return {'CartItems': cart_items_lst}


# CREATE NEW CART ITEMS add into active cart
@cart_routes.route('/<int:id>/products/new', methods=['POST'])
@login_required
def add_product_toCart(id):
    if not current_user:
        return jsonify({'error': 'Unauthorized'}), 403

    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # Get the active cart
    active_cart = Cart.query.filter_by(user_id=current_user.id, isOrdered=False).first()
    if form.validate_on_submit():
        params = {
            'cart_id':id,
            'product_id': form.product_id.data,
            'quantity':form.quantity.data
        }
        add_toCart = CartItem(**params)
        db.session.add(add_toCart)
        db.session.commit()
        return add_toCart.to_dict()
    return jsonify({'error': form.errors}), 400

# UPDATE CART ITEMS
@cart_routes.route('/active/<int:id>/edit', methods=['PUT']) #/active/cartItemId/edit
@login_required
def update_cart(id):
    if not current_user:
        return jsonify({'error': 'Unauthorized'}), 403


    cart_item = CartItem.query.get(id)
    if not cart_item:
        return jsonify({'error': 'Cart Item not found'}), 404
    curr_cart = Cart.query.filter(Cart.id == cart_item.cart_id).first()

    # if this is not your cart
    if current_user.id != curr_cart.user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    # if this cart has been ordered already return 400
    if curr_cart.isOrdered == True:
        return jsonify({'error': 'Cannot edit past orders.'}), 400

    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        cart_item.quantity = form.quantity.data

        db.session.commit()
        return jsonify({"message": "Cart Item quantity sucessfully updated."})
    return form.errors, 400

# DELETE remove product from active cart
@cart_routes.route('/active/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_item(id):
    if not current_user:
        return jsonify({'error': 'Unauthorized'}), 403

    # get deleted cartitem
    cart_item = CartItem.query.get(id)
    if not cart_item:
        return jsonify({'error': 'Cart Item not found'}), 404

    # get the cart (cartItem is in)
    curr_cart = Cart.query.filter(Cart.id == cart_item.cart_id).first()


    if current_user.id != curr_cart.user_id:
        return jsonify({'error': 'Unauthorized'}), 403


    if curr_cart.isOrdered == True:
        return jsonify({'error': 'Cannot remove past orders.'}), 400

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({"message": 'Cart item successfully deleted.'})
