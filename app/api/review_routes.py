from flask import Blueprint, jsonify, request
from app.models import db, Review, Product
from flask_login import current_user, login_required
from app.forms.review_form import CreateReviewForm
from .aws import s3_upload_file, s3_remove_file, unique_filename

reviews_routes = Blueprint('reviews', __name__)

@reviews_routes.route('/reviews', methods=["GET"])
def get_all_reviews():
    reviews = Review.query.all()
    reviews_dict = {review.id: review.to_dict() for review in reviews}
    return reviews_dict

# GET ALL REVIEWS FOR A SPECIFIC PRODUCT
@reviews_routes.route('/products/<int:product_id>/reviews', methods=['GET'])
def get_reviews(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    reviews_dict = {review.id: review.to_dict() for review in reviews}
    return reviews_dict

# POST A REVIEW FOR A SPECIFIC PRODUCT
@reviews_routes.route('/products/<int:product_id>/reviews', methods=['POST'])
@login_required
def post_review(product_id):

    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    review_content = form.review_content.data
    rating = form.rating.data
    image = form.image.data
    # print('====>',request.form)
    # print('=====>',request.files)

    if not form.validate_on_submit():
        return {"errors": form.errors}, 400

    if image != "null":
        image.filename = unique_filename(image.filename)
        upload = s3_upload_file(image)
        # If the S3 upload fails: # AWS ERROR OBJECT {"errors": <aws_error>}
        if 'url' not in upload:

            return upload, 400
    else:
        upload = {}
        upload["url"] = None

    # Create a new review instance
    new_review = Review(
        user_id=current_user.id,
        product_id=product_id,
        review_content=review_content,
        rating=rating,
        image_url=upload["url"]
    )

    # Add to the session and commit to the database
    db.session.add(new_review)
    db.session.commit()
    db.session.refresh(new_review)

    # Return the new review as a JSON response
    return new_review.to_dict(), 201




@reviews_routes.route('/reviews/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return {'error': 'Review not found'}, 404
    if review.user_id != current_user.id:
        return {'error': 'Unauthorized'}, 403

    deleted = review.to_dict()

    db.session.delete(review)
    db.session.commit()


    if deleted["image_url"] != None:
        removed = s3_remove_file(deleted['image_url'])

        if removed != True:

            print(removed["errors"])

    return {'message': 'Review successfully deleted'}, 200

@reviews_routes.route('/reviews/<int:review_id>/edit', methods=['PUT'])
@login_required
def update_review(review_id):
   review = Review.query.get(review_id)
   if not review:
        return jsonify({'error': 'Review not found'}), 404
   if review.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

   form = CreateReviewForm()
   form['csrf_token'].data = request.cookies['csrf_token']

   if form.validate_on_submit():
        if 'image_url' in request.files:
            new_img = request.files['image_url']
            new_img.filename = get_unique_filename(new_img.filename)
            upload = upload_file_to_s3(new_img)
            print(upload)

            if "url" not in upload:
                return jsonify({'error': 'Not a valid image'}), 400
            new_url = upload['url']
            review.image_url = new_url
        else:
            new_url = None

        image = form.image.data
        is_url = isinstance(image, str)
        if image != "null" and not is_url:
            image.filename = unique_filename(image.filename)
            upload = s3_upload_file(image)
            if 'url' not in upload:
                return upload, 400
        else:
            upload = {}
            if is_url:
                upload["url"] = image
            else:
                upload["url"] = None

        review.rating = form.rating.data
        review.review_content = form.review_content.data
        review.image_url = upload["url"]

        db.session.commit()
        return jsonify({"message": 'Review updated successfully.'})
   return form.errors, 400
