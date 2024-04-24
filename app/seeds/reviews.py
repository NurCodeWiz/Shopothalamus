from app.models import db, Review,environment,SCHEMA
from datetime import datetime, timezone
from sqlalchemy.sql import text

def seed_reviews():

        review1=Review(user_id=1, product_id=1, rating=5, review_content="Incredible lighting options with easy setup.", image_url="https://nurawsbucket.s3.amazonaws.com/bright2.jpeg", createdAt=datetime.now(timezone.utc), updatedAt=datetime.now(timezone.utc))
        review2=Review(user_id=1, product_id=2, rating=4, review_content="Works well but setup was a bit complicated.", createdAt=datetime.now(timezone.utc), updatedAt=datetime.now(timezone.utc))
        review3=Review(user_id=2, product_id=3, rating=5, review_content="Best thermostat I've ever used.", image_url="https://nurawsbucket.s3.amazonaws.com/43290408.webp", createdAt=datetime.now(timezone.utc), updatedAt=datetime.now(timezone.utc))
        review4=Review(user_id=2, product_id=4, rating=5, review_content="Super secure and very convenient for families.", createdAt=datetime.now(timezone.utc), updatedAt=datetime.now(timezone.utc))
        review5=Review(user_id=3, product_id=5, rating=4, review_content="Good but a bit pricey for the features.", createdAt=datetime.now(timezone.utc), updatedAt=datetime.now(timezone.utc))
        review6=Review(user_id=3, product_id=6, rating=3, review_content="Not as bright as I expected.", createdAt=datetime.now(timezone.utc), updatedAt=datetime.now(timezone.utc))
        review7=Review(user_id=1, product_id=7, rating=5, review_content="Installation was a breeze, and it integrates well with other smart home devices.", createdAt=datetime.now(timezone.utc), updatedAt=datetime.now(timezone.utc))
        review8=Review(user_id=1, product_id=8, rating=4, review_content="High quality video, but a bit expensive.", createdAt=datetime.now(timezone.utc), updatedAt=datetime.now(timezone.utc))
        review9=Review(user_id=2, product_id=9, rating=5, review_content="Perfect! Saves energy and keeps the home comfortable.", createdAt=datetime.now(timezone.utc), updatedAt=datetime.now(timezone.utc))
        review10=Review(user_id=2, product_id=10, rating=4, review_content="Great system, though I wish the sensors were cheaper.", createdAt=datetime.now(timezone.utc), updatedAt=datetime.now(timezone.utc))


        db.session.add_all([review1,review2,review3,review4,review5,review6,review7,review8,review9,review10])

        db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
