from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import db, add_prefix_for_prod,environment,SCHEMA

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    product_id = Column(Integer, ForeignKey(add_prefix_for_prod('products.id'), ondelete='CASCADE'), nullable=False)
    rating = Column(Integer, nullable=False)
    review_content = Column(String(2000), nullable=False)
    image_url = Column(String(500))
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    users = relationship('User', back_populates='reviews', passive_deletes=True)
    products = relationship('Product', back_populates='reviews', passive_deletes=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'rating': self.rating,
            'review_content': self.review_content,
            'image_url': self.image_url,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
    def __repr__(self):
        return f"<Review by User {self.user_id} on Product {self.product_id}>"
