from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product
from .aws import unique_filename, s3_upload_file, s3_remove_file

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
