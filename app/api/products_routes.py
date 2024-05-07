from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Product,ProductImage
from .aws import unique_filename, s3_upload_file, s3_remove_file
from app.forms.product_form import ProductForm
from app.forms.image_form import ImageForm
products_routes = Blueprint("products_routes", __name__)

@products_routes.route('/')
def get_all_products():

    # print("=================")
    all_products = Product.query.all()
    products_with_images = {}
    for product in all_products:
        images = product.images
        product_dict = product.to_dict()
        product_dict['images'] = [image.to_dict() for image in images]
        products_with_images[product.id] = product_dict
    return products_with_images

    # return {product.to_dict()["id"]: product.to_dict() for product in all_products}

@products_routes.route('/<string:category>')
def get_products_by_category(category):
    products_by_category = Product.query.filter(Product.category == category).all()
    products_with_images = {}
    for product in products_by_category:
        images = product.images
        product_dict = product.to_dict()
        product_dict['images'] = [image.to_dict() for image in images]
        products_with_images[product.id] = product_dict
    # print(products_with_images)
    return products_with_images

# #single product
# @products_routes.route('/<int:id>')
# def get_single_product(id):
#     single_product = Product.query.filter(Product.id == id).first()
#     return single_product.to_dict()
@products_routes.route('/<int:id>')
def get_single_product(id):
    single_product = Product.query.filter(Product.id == id).first()
    if single_product is None:
        return {'message': 'Product not found'}, 404
    product_dict = single_product.to_dict()
    images = single_product.images
    product_dict['images'] = [image.to_dict() for image in images]
    return product_dict

@products_routes.route('/', methods=['POST'])
@login_required
def create_new_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print("newproduct")

    if form.validate_on_submit():
        new_product = Product(
            name=form.name.data,
            description=form.description.data,
            category=form.category.data,
            price=form.price.data,
            provider_id=current_user.id
        )

        image = form.image.data
        if image:
            image.filename = unique_filename(image.filename)
            upload = s3_upload_file(image)
            if 'url' not in upload:
                return jsonify({"errors": "Failed to upload image"}), 400

            product_image = ProductImage(url=upload['url'], preview=True)
            new_product.images.append(product_image)

        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.to_dict()), 201

    return jsonify({"errors": form.errors}), 400
