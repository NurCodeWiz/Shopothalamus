from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import db, add_prefix_for_prod,environment,SCHEMA

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    isOrdered = Column(Boolean, default=False, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    user = relationship('User', back_populates='carts')
    cart_items = relationship('CartItem', back_populates='cart', cascade='all, delete-orphan')
    orders = relationship('Order', back_populates='cart',cascade='all, delete-orphan')

    @property
    def cartItems(self):
        return [items.to_dict() for items in self.cart_items]

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'isOrdered': self.isOrdered,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
    def __repr__(self):
     return f"<Cart {self.id} -- User {self.user_id} -- Ordered: {'Yes' if self.isOrdered else 'No'}>"
