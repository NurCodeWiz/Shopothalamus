from flask import Blueprint
from flask_login import login_required
from app.models import db, ProductImage
from .aws import s3_remove_file

product_images = Blueprint('product_images', __name__)

@product_images.delete('/<int:image_id>')
@login_required
def delete_product_image(image_id):
    image = db.session.get(ProductImage, image_id)
    deleted = image.to_dict()

    removed = s3_remove_file(image.url)


    if removed != True:
        return removed, 400
    db.session.delete(image)
    db.session.commit()

    return deleted, 200
