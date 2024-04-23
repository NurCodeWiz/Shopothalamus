from .db import db,environment,SCHEMA
from sqlalchemy import Column, Integer, Numeric, ForeignKey, String, Boolean, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


id = Column(Integer, primary_key=True)
provider_id = Column(Integer, ForeignKey('users.id'), nullable=False)
name = Column(String(255), nullable=False)
price = Column(Numeric(10, 2), nullable=False)
category = Column(String(255), nullable=False)
description = Column(Text)
is_deleted = Column(Boolean, default=False)
created_at = Column(DateTime, default=datetime.utcnow)
updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

provider = relationship('User', back_populates='products')
reviews = relationship('Review', back_populates='product', cascade='all, delete-orphan')
cart_items = relationship('CartItem', back_populates='product', cascade='all, delete-orphan')
product_orders = relationship('ProductOrder', back_populates='product', cascade='all, delete-orphan')
images = db.relationship("ProductImage", back_populates="product", cascade='all, delete-orphan')

def to_dict(self):
        return {
            'id': self.id,
            'provider_id': self.provider_id,
            'name': self.name,
            'price': str(self.price),
            'category': self.category,
            'description': self.description if self.description else "",
            'is_deleted': self.is_deleted,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'reviews': [review.to_dict() for review in self.reviews]
        }
