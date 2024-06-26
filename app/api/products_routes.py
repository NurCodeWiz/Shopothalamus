from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Product,ProductImage
from .aws import unique_filename, s3_upload_file, s3_remove_file
from app.forms.product_form import ProductForm
from app.forms.image_form import ImageForm
from werkzeug.utils import secure_filename
products_routes = Blueprint("products_routes", __name__)

@products_routes.route('/')
def get_all_products():
    search_name = request.args.get('name')
    # print("SEARCH FOR:", search_name)

    query = Product.query

    if search_name:
        query = query.filter(Product.name.ilike(f'%{search_name}%'))

    # print("=================")
    all_products = query.all()
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

    # print("newproduct")

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

@products_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_product(id):
    data = request.json
    form = ProductForm(**data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product_to_update = Product.query.filter(Product.id == id).first()
        for key, value in data.items():
            setattr(product_to_update, key, value)
        db.session.commit()
        return product_to_update.to_dict()
    elif form.errors:
        return form.errors, 400
    else :
        return {"message": "There was an error"}, 500

@products_routes.post('/<int:id>/product_images')
@login_required
def create_new_image(id):
    """
    Adds an image by <id>
    """
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Get the image file from the form
        image = form.data["image"]
        image.filename = unique_filename(image.filename)
        # Send to S3 bucket
        upload = s3_upload_file(image)

        print(upload)


        if "url" not in upload:

            return upload

        # File upload success - grab the aws url
        url = upload["url"]
        # Check if an image already exists
        # If so set preview to false
        num_product_images = len(ProductImage.query.filter_by(product_id=id).all())
        preview = num_product_images < 1

        # If there are 5 images already, send an error
        if num_product_images >= 5:
            return {'errors': 'products can only have 5 images' }, 400

        # Create new product image object with url, product id, and preview
        new_image = ProductImage(
            url=url,
            product_id=int(id),
            preview=preview
        )

        db.session.add(new_image)
        db.session.commit()

        # Grab latest version of object from db (just in case)
        db.session.refresh(new_image)


        return new_image.to_dict(), 201


    return { "errors": form.errors }, 400

@products_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_product(id):
    product_to_delete = Product.query.filter(Product.id == id).first()
    if product_to_delete:
        deleted = product_to_delete.to_dict()


        db.session.delete(product_to_delete)
        db.session.commit()

        # AWS IMAGE DELETE
        if 'imageUrl' in deleted:
            image_url = deleted['imageUrl']

            removed = s3_remove_file(image_url)

            if removed != True:
                print("AWS ERROR:", removed["errors"])

        return {"message": "Successfully deleted"}
    else:
        return {"message": "Product was not found."}
